import 'reflect-metadata';

import axios from 'axios';
import RedisSession from 'connect-redis';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import { createServer } from 'http';
import { stringify } from 'query-string';
import redis from 'redis';
import { createConnection, getRepository } from 'typeorm';

import createApolloServer from './create-apollo-server';
import Group from './entities/group';
import User from './entities/user';
import typeormConfig from './typeorm-config';
import { base64 } from './utils/base64';

dotenv.config();

const redisClient = redis.createClient({
	host: 'redis',
});
const RedisSessionStore = RedisSession(session);

(async function () {
	try {
		await createConnection(typeormConfig);

		const app = express();
		app.use(
			session({
				store: new RedisSessionStore({ client: redisClient }),
				secret: String(process.env.SESSION_SECRET),
				resave: false,
				saveUninitialized: false,
			}),
		);

		app.get('/api/auth/gamma/callback', async (req, res) => {
			const { code } = req.query;
			if (typeof code !== 'string') {
				throw new Error('Invalid code query value');
			}

			const clientId = String(process.env.GAMMA_CLIENT_ID);
			const clientSecret = String(process.env.GAMMA_CLIENT_SECRET);
			const redirectUri = String(process.env.GAMMA_REDIRECT_URI);
			const tokenUri = String(process.env.GAMMA_DOMAIN + '/api/oauth/token');
			const profileUri = String(process.env.GAMMA_DOMAIN + '/api/users/me');

			/* eslint-disable @typescript-eslint/camelcase */
			const query = stringify({
				grant_type: 'authorization_code',
				code,
				client_id: clientId,
				redirect_uri: redirectUri,
			});
			/* eslint-enable @typescript-eslint/camelcase */

			const basicCredentials = base64(clientId + ':' + clientSecret);

			try {
				const tokenResult = await axios.post(`${tokenUri}?${query}`, null, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						Authorization: 'Basic ' + basicCredentials,
					},
				});
				const accessToken = tokenResult.data['access_token'];

				const profileResult = await axios.get(profileUri, {
					headers: {
						Authorization: 'Bearer ' + accessToken,
					},
				});
				const id = profileResult.data['id'];
				const firstName = profileResult.data['firstName'];
				const lastName = profileResult.data['lastName'];

				const userRepository = getRepository(User);
				let user = await userRepository.findOne({ gammaId: id });
				if (!user) {
					user = userRepository.create({
						gammaId: id,
						firstName,
						lastName,
					});
					user = await userRepository.save(user);

					const groupRepository = getRepository(Group);

					// This is untyped, should probably add some checks
					const groups = profileResult.data['groups'];
					for (const group of groups) {
						const gammaId = group.superGroup.id;
						let g = await groupRepository.findOne({
							where: { gammaId },
							relations: ['users'],
						});
						if (g) {
							// Group exists, check if user is in that group
							if (!g.users.find(u => u.id === user.id)) {
								// User is not in group, add to group
								g.users.push(user);
								await groupRepository.save(g);
							}
						} else {
							g = groupRepository.create({
								gammaId,
								name: group.superGroup.name,
								users: [user],
							});
							g = await groupRepository.save(g);
						}
					}
				}

				if (req.session) {
					req.session.auth = {
						userId: user.id,
						accessToken,
					};
				}

				return res.redirect('/');
			} catch (error) {
				console.error(error.message);
			}
		});

		const server = await createApolloServer();
		server.applyMiddleware({
			app,
			path: '/api/graphql',
		});

		const httpServer = createServer(app);
		httpServer.listen(3000, () => {
			console.log('Server running');
		});
	} catch (e) {
		console.error(e);
	}
})();
