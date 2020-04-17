import { FieldResolver, Resolver, Root } from 'type-graphql';
import { getRepository } from 'typeorm';

import DBGroup from '../../entities/group';
import GQLUser from '../user/user';

import GQLGroup from './group';

@Resolver(() => GQLGroup)
export default class ItemFieldResolver {
	@FieldResolver()
	async owner(@Root() group: GQLGroup): Promise<GQLUser> {
		const groupRepository = getRepository(DBGroup);
		const dbGroup = await groupRepository.findOne({
			where: { id: group.id },
			relations: ['owner'],
		});
		if (dbGroup) {
			return dbGroup.owner;
		} else {
			// Should never happen
			throw new Error('Group not found');
		}
	}
}
