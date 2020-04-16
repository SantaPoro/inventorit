import { Query, Resolver } from 'type-graphql';

import GQLUser from '../user/user';

@Resolver()
export default class MeQueryResolver {
	@Query(() => GQLUser)
	me() {
		throw new Error('nah');
	}
}
