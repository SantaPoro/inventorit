import { Injectable } from '@graphql-modules/di';
import { getRepository, Repository } from 'typeorm';

import Item from '../../entities/item';
import { GroupProvider } from '../group/group.provider';

interface CreateItemInput {
	name: string;
	amount: number;
	groupId: string;
}

@Injectable()
export class ItemProvider {
	private itemRepository: Repository<Item>;

	constructor(private groupProvider: GroupProvider) {
		this.itemRepository = getRepository(Item);
	}

	getItems() {
		return this.itemRepository.find();
	}

	async getItem(id: string) {
		const item = await this.itemRepository.findOne(id);
		if (!item) {
			throw new Error('Item not found');
		}

		return item;
	}

	getItemsByGroupId(groupId: string) {
		return this.itemRepository.find({ where: { groupId } });
	}

	async createItem({ name, amount, groupId }: CreateItemInput) {
		const group = await this.groupProvider.getGroup(groupId);
		const item = this.itemRepository.create({
			name,
			amount,
			group,
		});
		return this.itemRepository.save(item);
	}
}
