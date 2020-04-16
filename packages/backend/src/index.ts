import 'reflect-metadata';

import axios from 'axios';
import RedisSession from 'connect-redis';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import redis from 'redis';
import { createConnection } from 'typeorm';

import createApolloServer from './apollo';

dotenv.config();

const RedisSessionStore = RedisSession(session);

const redisClient = redis.createClient({
	host: 'redis',
	password: String(process.env.REDIS_PASSWORD),
});

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
				const { code } = req.query;
				const basicCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

				const redirectUri = String(process.env.GAMMA_REDIRECT_URI);
				const result = await axios.post(
					`https://gamma.chalmers.it/api/oauth/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`,
					null,
					{
						headers: {
							Authorization: `Basic ${basicCredentials}`,
						},
					},
				);
				if (req.session) {
					req.session.gamma = {
						accessToken: result.data['access_token'],
						scope: result.data['scope'],
					};
				}
				res.redirect('/');
			} catch (e) {
				console.log(e);
			}
		});

		const server = await createApolloServer();
		server.applyMiddleware({ app });

		app.listen(3000, () => console.log('Server ready at 3000'));
	} catch (e) {
		console.log(e);
	}
})();
