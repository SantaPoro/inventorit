import { GraphQLModule, ModuleContext } from '@graphql-modules/core';
import { loadFiles } from '@graphql-toolkit/file-loading';
import path from 'path';

import { GQLResolvers } from '../../__generated__/types';
import { RelayModule } from '../relay';

import { UserProvider } from './user.provider';

export interface UserModuleContext extends ModuleContext {}

export type UserModuleResolversType = GQLResolvers<ModuleContext<UserModuleContext>>;

export const UserModule = new GraphQLModule({
	imports: [RelayModule],
	providers: [UserProvider],
	typeDefs: loadFiles(path.join(__dirname, 'schema', '*.{gql,ts}')),
	resolvers: loadFiles<UserModuleResolversType>(path.join(__dirname, 'resolvers', '**/*.ts')),
});
