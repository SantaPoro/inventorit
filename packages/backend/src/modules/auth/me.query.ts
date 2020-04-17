import { Ctx, Query, Resolver } from 'type-graphql';

import { Context } from '../../apollo';
import GQLUser from '../user/user';

@Resolver()
export default class MeQueryResolver {
	@Query(() => GQLUser)
	me(@Ctx() context: Context): GQLUser {
		if (context.user) {
			return context.user;
		}

		throw new Error('not logged in');
	}
}
