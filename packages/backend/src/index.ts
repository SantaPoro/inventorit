import 'reflect-metadata';

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

		const server = await createApolloServer();
		server.applyMiddleware({ app });

		app.listen(3000, () => console.log('Server ready at 3000'));
	} catch (e) {
		console.log(e);
	}
})();
