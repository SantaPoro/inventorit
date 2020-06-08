import { Injectable } from '@graphql-modules/di';
import { Request } from 'express';

import { UserProvider } from '../user/user.provider';

interface LoginArgs {
	email: string;
	password: string;
	req: Request;
}

@Injectable()
export class AuthProvider {
	constructor(private userProvider: UserProvider) {}

	login({ email, password, req }: LoginArgs) {
		const user = this.userProvider.getUserByEmail(email);
		if (password !== user.password) {
			throw new Error('Invalid password');
		}

		if (req.session) {
			req.session.auth = {
				userId: user.id,
			};
		}

		return user;
	}
}
