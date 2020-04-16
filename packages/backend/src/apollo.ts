import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { getRepository } from 'typeorm';

import User from './entities/user';

export interface Context {
	user?: User;
}

async function createApolloServer() {
	const schema = await buildSchema({
		resolvers: [__dirname + '/modules/**/*.{query,mutation}.{ts,js}'],
	});

	return new ApolloServer({
		schema,
		context: async (context): Promise<Context> => {
			let user: User | undefined;
			try {
				const userRepository = getRepository(User);
				user = await userRepository.findOne({ where: { id: context.req.session?.auth.userId } });
			} catch (e) {
				// User isn't logged in
			}

			return {
				user,
			};
		},
	});
}

export default createApolloServer;
