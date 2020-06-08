import { RelayModuleResolversType } from '..';
import { fromGlobalId } from '../../../utils/global-id';

const resolvers: RelayModuleResolversType = {
	Query: {
		node: (_parent, { id: globalId }) => {
			const { type, id } = fromGlobalId(globalId);

			return {
				__typename: type,
				id,
			};
		},
	},
};

export default resolvers;
