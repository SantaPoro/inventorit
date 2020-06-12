import { GraphQLModule, ModuleContext } from '@graphql-modules/core';
import { loadFiles } from '@graphql-toolkit/file-loading';
import { Request } from 'express';
import path from 'path';

import { GQLResolvers } from '../../__generated__/types';
import { ApolloContext } from '../../create-apollo-server';
import User from '../../entities/user';
import { UserModule } from '../user';
import { UserProvider } from '../user/user.provider';

import { AuthProvider } from './auth.provider';

export interface AuthModuleContext {
	req: Request;
	user: User | null;
}

export type AuthModuleResolversType = GQLResolvers<ModuleContext<AuthModuleContext>>;

export const AuthModule = new GraphQLModule<{}, ApolloContext, AuthModuleContext>({
	imports: [UserModule],
	providers: [AuthProvider],
	typeDefs: loadFiles(path.join(__dirname, 'schema', '*.{gql,ts}')),
	resolvers: loadFiles<AuthModuleResolversType>(path.join(__dirname, 'resolvers', '**/*.ts')),
	context: async ({ req }, _previousContext, { injector }) => {
		let user: User | null = null;
		if (req.session) {
			try {
				user = await injector.get(UserProvider).getUser(req.session.auth.userId);
			} catch (error) {
				// User not logged in
			}
		}

		return {
			req,
			user,
		};
	},
});
