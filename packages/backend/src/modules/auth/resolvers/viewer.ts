import { AuthModuleResolversType } from '..';

const resolvers: AuthModuleResolversType = {
	Viewer: {
		isLoggedIn: (_parent, _input, { user }) => {
			return user !== null;
		},
		user: (_parent, _input, { user }) => {
			return user;
		},
	},
};

export default resolvers;
