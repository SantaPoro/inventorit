import { ItemModuleResolversType } from '..';
import { fromGlobalId } from '../../../utils/global-id';
import { ItemProvider } from '../item.provider';

const resolvers: ItemModuleResolversType = {
	Mutation: {
		createItem: async (_parent, { input }, { injector }) => {
			const item = await injector.get(ItemProvider).createItem({
				...input,
				groupId: fromGlobalId(input.group).id,
			});

			return {
				itemEdge: {
					node: item,
					cursor: '',
				},
			};
		},
	},
};

export default resolvers;
