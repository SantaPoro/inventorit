import { ItemModuleResolversType } from '..';
import { toGlobalId } from '../../../utils/global-id';
import { ItemProvider } from '../item.provider';

const resolvers: ItemModuleResolversType = {
	Item: {
		id: ({ id }) => {
			return toGlobalId('Item', id);
		},
		name: async ({ id }, _input, { injector }) => {
			const item = await injector.get(ItemProvider).getItem(id);

			return item.name;
		},
		amount: async ({ id }, _input, { injector }) => {
			const item = await injector.get(ItemProvider).getItem(id);

			return item.amount;
		},
		group: async ({ id }, _input, { injector }) => {
			const item = await injector.get(ItemProvider).getItem(id);

			return {
				id: item.groupId,
			};
		},
	},
};

export default resolvers;
