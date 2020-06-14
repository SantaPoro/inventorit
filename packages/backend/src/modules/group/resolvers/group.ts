import { GroupModuleResolversType } from '..';
import { toGlobalId } from '../../../utils/global-id';
import { GroupProvider } from '../group.provider';

const resolvers: GroupModuleResolversType = {
	Group: {
		id: ({ id }) => {
			return toGlobalId('Group', id);
		},
		name: async ({ id }, _input, { injector }) => {
			const group = await injector.get(GroupProvider).getGroup(id);

			return group.name;
		},
	},
};

export default resolvers;
