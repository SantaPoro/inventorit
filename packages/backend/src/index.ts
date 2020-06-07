import 'reflect-metadata';

import RedisSession from 'connect-redis';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import { createServer } from 'http';
import redis from 'redis';
import { createConnection } from 'typeorm';

import createApolloServer from './create-apollo-server';
import typeormConfig from './typeorm-config';

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

		const server = await createApolloServer();
		server.applyMiddleware({ app });

		const httpServer = createServer(app);
		httpServer.listen(3000, () => {
			console.log('Server running');
		});
	} catch (e) {
		console.error(e);
	}
})();
