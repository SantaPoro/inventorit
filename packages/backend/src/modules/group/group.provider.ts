import { Injectable } from '@graphql-modules/di';
import { getRepository, Repository } from 'typeorm';

import Group from '../../entities/group';

@Injectable()
export class GroupProvider {
	private groupRepository: Repository<Group>;

	constructor() {
		this.groupRepository = getRepository(Group);
	}

	getGroups() {
		return this.groupRepository.find();
	}

	async getGroup(id: string) {
		const group = await this.groupRepository.findOne(id);
		if (!group) {
			throw new Error('Group not found');
		}

		return group;
	}

	getGroupsByUserId(userId: string) {
		return this.groupRepository
			.createQueryBuilder('group')
			.innerJoin('group.users', 'groupUser', 'groupUser.id = :userId', { userId })
			.getMany();
	}
}
