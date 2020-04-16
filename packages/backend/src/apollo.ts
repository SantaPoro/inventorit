import { ApolloServer } from 'apollo-server-express';
import Axios from 'axios';
import { buildSchema } from 'type-graphql';

import User from './entities/user';

export interface Context {
	user: User | null;
}

async function createApolloServer() {
	const schema = await buildSchema({
		resolvers: [__dirname + '/modules/**/*.{query,mutation}.{ts,js}'],
	});

	return new ApolloServer({
		schema,
		context: async (context): Promise<Context> => {
			let user = null;
			try {
				const result = await Axios.get(`https://gamma.chalmers.it/api/users/me`, {
					headers: {
						Authorization: `Bearer ${context.req.session?.gamma?.accessToken}`,
					},
				});
				console.log(result);
				user = null;
			} catch (e) {
				console.log('not logged in bruh');
				user = null;
			}
			return {
				user,
			};
		},
	});
}

export default createApolloServer;
