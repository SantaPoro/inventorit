import { GraphQLModule, ModuleContext } from '@graphql-modules/core';
import { loadFiles } from '@graphql-toolkit/file-loading';
import path from 'path';

import { GQLResolvers } from '../../__generated__/types';
import { AuthModule } from '../auth';
import { RelayModule } from '../relay';
import { UserModule } from '../user';

import { GroupProvider } from './group.provider';

export interface GroupModuleContext extends ModuleContext {}

export type GroupModuleResolversType = GQLResolvers<ModuleContext<GroupModuleContext>>;

export const GroupModule = new GraphQLModule({
	imports: [AuthModule, RelayModule, UserModule],
	providers: [GroupProvider],
	typeDefs: loadFiles(path.join(__dirname, 'schema', '*.{gql,ts}')),
	resolvers: loadFiles<GroupModuleContext>(path.join(__dirname, 'resolvers', '**/*.ts')),
});
