import { AuthModuleResolversType } from '..';

const resolvers: AuthModuleResolversType = {
	Query: {
		viewer: () => {
			return {};
		},
	},
};

export default resolvers;
