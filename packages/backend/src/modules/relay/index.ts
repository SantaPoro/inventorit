import { GraphQLModule, ModuleContext } from '@graphql-modules/core';
import { loadFiles } from '@graphql-toolkit/file-loading';
import path from 'path';

import { GQLResolvers } from '../../__generated__/types';

export interface RelayModuleContext {}

export type RelayModuleResolversType = GQLResolvers<ModuleContext<RelayModuleContext>>;

export const RelayModule = new GraphQLModule({
	typeDefs: loadFiles(path.join(__dirname, 'schema', '*.gql')),
	resolvers: loadFiles<RelayModuleResolversType>(path.join(__dirname, 'resolvers', '**/*.ts')),
});
