import { GraphQLModule, ModuleContext } from '@graphql-modules/core';
import { loadFiles } from '@graphql-toolkit/file-loading';
import path from 'path';

import { GQLResolvers } from '../../__generated__/types';
import { AuthModule } from '../auth';
import { GroupProvider } from '../group/group.provider';
import { RelayModule } from '../relay';

import { ItemProvider } from './item.provider';

export interface ItemModuleContext extends ModuleContext {}

export type ItemModuleResolversType = GQLResolvers<ModuleContext<ItemModuleContext>>;

export const ItemModule = new GraphQLModule({
	imports: [AuthModule, RelayModule],
	providers: [GroupProvider, ItemProvider],
	typeDefs: loadFiles(path.join(__dirname, 'schema', '*.{gql,ts}')),
	resolvers: loadFiles<ItemModuleResolversType>(path.join(__dirname, 'resolvers', '**/*.ts')),
});
