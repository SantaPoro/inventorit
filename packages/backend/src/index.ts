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

interface GammaUser {
	id: string;
	firstName: string;
	lastName: string;
	groups: GammaGroup[];
}

interface GammaGroup {
	superGroup: GammaSuperGroup;
}

interface GammaSuperGroup {
	id: string;
	name: string;
	type: string;
}

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

				const profile = profileResult.data as GammaUser;
				const { id, firstName, lastName } = profile;

				const userRepository = getRepository(User);
				let user = await userRepository.findOne({ gammaId: id });
				if (!user) {
					user = userRepository.create({
						gammaId: id,
						firstName,
						lastName,
					});
					user = await userRepository.save(user);
					if (!user) {
						throw new Error('Could not create user');
					}

					// TypeScript isn't able to infer that user is not undefined for some reason,
					// assigned to a new variable seems to help
					const newUser = user;
					const groupRepository = getRepository(Group);
					await Promise.all(
						profile.groups.map(async gammaGroup => {
							if (gammaGroup.superGroup.type !== 'COMMITTEE' || !user) {
								return;
							}

							const gammaGroupId = gammaGroup.superGroup.id;
							let group = await groupRepository.findOne({
								where: { gammaId: gammaGroupId },
								relations: ['users'],
							});
							if (group) {
								if (!group.users.find(({ id }) => id === newUser.id)) {
									// User is not in group, add to group
									group.users.push(newUser);
									await groupRepository.save(group);
								}
							} else {
								group = groupRepository.create({
									gammaId: gammaGroupId,
									name: gammaGroup.superGroup.name,
									users: [newUser],
								});
								group = await groupRepository.save(group);
							}
						}),
					);

					if (req.session) {
						req.session.auth = {
							userId: user.id,
							accessToken,
						};
					}
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
