import { ItemModuleResolversType } from '..';
import { connectionFromArray } from '../../../utils/relay';
import { ItemProvider } from '../item.provider';

const resolvers: ItemModuleResolversType = {
	Group: {
		items: async ({ id }, args, { injector }) => {
			const items = await injector.get(ItemProvider).getItemsByGroupId(id);

			return connectionFromArray(items, args);
		},
	},
};

export default resolvers;
