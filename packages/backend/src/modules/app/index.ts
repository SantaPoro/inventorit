import { GraphQLModule } from '@graphql-modules/core';

import { AuthModule } from '../auth';
import { GroupModule } from '../group';
import { ItemModule } from '../item';
import { RelayModule } from '../relay';
import { UserModule } from '../user';

export const AppModule = new GraphQLModule({
	imports: [AuthModule, GroupModule, ItemModule, RelayModule, UserModule],
});
