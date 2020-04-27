import 'reflect-metadata';

import RedisSession from 'connect-redis';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import redis from 'redis';
import { createConnection, getRepository } from 'typeorm';

import createApolloServer from './apollo';
import Group from './entities/group';
import Item from './entities/item';
import typeormConfig from './typeorm-config';

dotenv.config();

const redisClient = redis.createClient({
	host: 'redis',
	password: String(process.env.REDIS_PASSWORD),
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
		server.applyMiddleware({
			app,
			cors: {
				origin: String(process.env.FRONTEND_LOCATION),
				credentials: true,
			},
		});

		app.listen(3000, () => console.log('Server ready at 3000'));
	} catch (e) {
		console.log(e);
	}
})();
