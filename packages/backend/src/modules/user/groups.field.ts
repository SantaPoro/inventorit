import { FieldResolver, Resolver, Root } from 'type-graphql';
import { getRepository } from 'typeorm';

import DBUser from '../../entities/user';
import GQLGroup from '../group/group';

import GQLUser from './user';

@Resolver(() => GQLUser)
export default class GroupsFieldResolver {
	@FieldResolver()
	async groups(@Root() user: GQLUser): Promise<GQLGroup[]> {
		const userRepository = getRepository(DBUser);
		const dbUser = await userRepository.findOne({ where: { id: user.id }, relations: ['groups'] });
		if (dbUser) {
			return dbUser.groups;
		} else {
			// Should never happen
			return [];
		}
	}
}
