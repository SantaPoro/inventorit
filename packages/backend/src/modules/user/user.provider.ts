import { Injectable } from '@graphql-modules/di';

const users = [
	{
		id: '0',
		name: 'Rosen',
		email: 'rasmus.rosengren@pm.me',
		password: 'password',
	},
];

@Injectable()
export class UserProvider {
	getUsers() {
		return users;
	}

	getUser(id: string) {
		const user = users.find(servers => servers.id === id);
		if (!user) {
			throw new Error('User not found');
		}

		return user;
	}

	getUserByEmail(email: string) {
		const user = users.find(servers => servers.email === email);
		if (!user) {
			throw new Error('User not found');
		}

		return user;
	}
}
