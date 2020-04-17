import 'reflect-metadata';

import axios from 'axios';
import RedisSession from 'connect-redis';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import redis from 'redis';
import { createConnection, getRepository } from 'typeorm';

import createApolloServer from './apollo';
import Group from './entities/group';
import Item from './entities/item';
import User from './entities/user';

dotenv.config();

const redisClient = redis.createClient({
	host: 'redis',
	password: String(process.env.REDIS_PASSWORD),
});
const RedisSessionStore = RedisSession(session);

const GAMMA_API_ENDPOINT = 'https://gamma.chalmers.it/api';

(async function () {
	try {
		await createConnection({
			type: 'postgres',
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			database: process.env.DB_DATABASE,
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			entities: [__dirname + '/entities/*.{ts,js}'],
			synchronize: process.env.NODE_ENV === 'development',
			logging: process.env.NODE_ENV === 'development',
		});

		const app = express();

		app.use(
			session({
				store: new RedisSessionStore({ client: redisClient }),
				secret: String(process.env.SESSION_SECRET),
				resave: false,
				saveUninitialized: false,
			}),
		);

		app.get('/auth/callback/gamma', async (req, res) => {
			try {
				const clientId = String(process.env.GAMMA_CLIENT_ID);
				const clientSecret = String(process.env.GAMMA_CLIENT_SECRET);
				const authCode = req.query.code;
				const basicCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

				const redirectUri = String(process.env.GAMMA_REDIRECT_URI);
				const tokenResult = await axios.post(
					`${GAMMA_API_ENDPOINT}/oauth/token?grant_type=authorization_code&code=${authCode}&redirect_uri=${redirectUri}`,
					null,
					{
						headers: {
							Authorization: `Basic ${basicCredentials}`,
						},
					},
				);
				const userResult = await axios.get(`${GAMMA_API_ENDPOINT}/users/me`, {
					headers: {
						Authorization: `Bearer ${tokenResult.data['access_token']}`,
					},
				});
				const userRepository = getRepository(User);
				let user = await userRepository.findOne({
					where: {
						gammaId: userResult.data.id,
					},
				});
				if (!user) {
					user = await userRepository.save({
						firstName: userResult.data.firstName,
						gammaId: userResult.data.id,
						lastName: userResult.data.lastName,
					});
				}
				if (req.session) {
					req.session.auth = {
						userId: user.id,
						accessToken: tokenResult.data['access_token'],
					};
				}
				res.redirect('/');
			} catch (e) {
				res.redirect('/error');
			}
		});

		app.get('/', async (_req, res) => {
			const itemRepository = getRepository(Item);

			const groupRepository = getRepository(Group);
			const groups = await groupRepository.find();

			const promises = groups.map(group => {
				return itemRepository.save({
					group,
					name: 'Item 123',
				});
			});

			const items = await Promise.all(promises);

			res.send(items);
		});

		const server = await createApolloServer();
		server.applyMiddleware({ app });

		app.listen(3000, () => console.log('Server ready at 3000'));
	} catch (e) {
		console.log(e);
	}
})();
