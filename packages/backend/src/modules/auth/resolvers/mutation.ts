import { AuthModuleResolversType } from '..';
import { AuthProvider } from '../auth.provider';

const resolvers: AuthModuleResolversType = {
	Mutation: {
		login: (_root, { input }, { injector, req }) => {
			const { email, password } = input;
			const user = injector.get(AuthProvider).login({ email, password, req });
			return {
				user,
			};
		},
	},
};

export default resolvers;
