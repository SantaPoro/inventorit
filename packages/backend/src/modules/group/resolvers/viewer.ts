import { GroupModuleResolversType } from '..';
import { connectionFromArray } from '../../../utils/relay';
import { GroupProvider } from '../group.provider';

const resolvers: GroupModuleResolversType = {
	Viewer: {
		groups: async (_parent, input, { injector }) => {
			const groups = await injector.get(GroupProvider).getGroups();

			return connectionFromArray(groups, input);
		},
	},
};

export default resolvers;
