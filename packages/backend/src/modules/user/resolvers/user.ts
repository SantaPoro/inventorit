import { UserModuleResolversType } from '..';
import { toGlobalId } from '../../../utils/global-id';
import { UserProvider } from '../user.provider';

const resolvers: UserModuleResolversType = {
	User: {
		id: ({ id }) => {
			return toGlobalId('User', id);
		},
		name: ({ id }, _input, { injector }) => {
			const user = injector.get(UserProvider).getUser(id);

			return user.name;
		},
		email: ({ id }, _input, { injector }) => {
			const user = injector.get(UserProvider).getUser(id);

			return user.email;
		},
	},
};

export default resolvers;
