import { GraphQLModule } from '@graphql-modules/core';

import { AuthModule } from '../auth';
import { RelayModule } from '../relay';
import { UserModule } from '../user';

export const AppModule = new GraphQLModule({
	imports: [AuthModule, RelayModule, UserModule],
});
