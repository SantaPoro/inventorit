import './generate-graphql-schema';

import { ApolloServer } from 'apollo-server-express';
import { Request, Response } from 'express';

import { AppModule } from './modules/app';

export interface ApolloContext {
	req: Request;
	res: Response;
}

async function createApolloServer() {
	return new ApolloServer({
		modules: [AppModule],
		context: (session): ApolloContext => session,
	});
}

export default createApolloServer;
