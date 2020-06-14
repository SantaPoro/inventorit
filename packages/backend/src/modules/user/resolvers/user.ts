import { UserModuleResolversType } from '..';
import { toGlobalId } from '../../../utils/global-id';
import { UserProvider } from '../user.provider';

const resolvers: UserModuleResolversType = {
	User: {
		id: ({ id }) => {
			return toGlobalId('User', id);
		},
		firstName: async ({ id }, _input, { injector }) => {
			const user = await injector.get(UserProvider).getUser(id);

			return user.firstName;
		},
		lastName: async ({ id }, _input, { injector }) => {
			const user = await injector.get(UserProvider).getUser(id);

			return user.lastName;
		},
	},
};

export default resolvers;
