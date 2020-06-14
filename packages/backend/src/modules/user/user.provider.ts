import { Injectable } from '@graphql-modules/di';
import { getRepository, Repository } from 'typeorm';

import User from '../../entities/user';

@Injectable()
export class UserProvider {
	private userRepository: Repository<User>;

	constructor() {
		this.userRepository = getRepository(User);
	}

	getUsers() {
		return this.userRepository.find();
	}

	async getUser(id: string) {
		const user = await this.userRepository.findOne(id);
		if (!user) {
			throw new Error('User not found');
		}

		return user;
	}
}
