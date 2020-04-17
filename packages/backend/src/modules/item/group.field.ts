import { FieldResolver, Resolver, Root } from 'type-graphql';
import { getRepository } from 'typeorm';

import DBItem from '../../entities/item';
import GQLGroup from '../group/group';

import GQLItem from './item';

@Resolver(() => GQLItem)
export default class GroupFieldResolver {
	@FieldResolver()
	async group(@Root() item: GQLItem): Promise<GQLGroup> {
		const itemRepository = getRepository(DBItem);
		const dbItem = await itemRepository.findOne({ where: { id: item.id }, relations: ['group'] });
		if (dbItem) {
			return dbItem.group;
		} else {
			// Should never happen
			throw new Error('Item not found');
		}
	}
}
