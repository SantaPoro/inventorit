import 'reflect-metadata';
import createApolloServer from './apollo';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

(async function () {
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

	const server = await createApolloServer();

	server.listen(3000).then(({ url }) => {
		console.log(`Server ready at ${url}`);
	});
})();
