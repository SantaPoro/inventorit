import { FieldResolver, Resolver, Root } from 'type-graphql';
import { getRepository } from 'typeorm';

import DBGroup from '../../entities/group';
import GQLItem from '../item/item';

import GQLGroup from './group';

@Resolver(() => GQLGroup)
export default class ItemFieldResolver {
	@FieldResolver()
	async items(@Root() group: GQLGroup): Promise<GQLItem[]> {
		const groupRepository = getRepository(DBGroup);
		const dbGroup = await groupRepository.findOne({
			where: { id: group.id },
			relations: ['items'],
		});
		if (dbGroup) {
			return dbGroup.items;
		} else {
			// Should never happen
			throw new Error('Group not found');
		}
	}
}
