import { AuthModuleResolversType } from '..';

const resolvers: AuthModuleResolversType = {
	Mutation: {
		logout: async (_root, _input, { req }) => {
			await new Promise((resolve, reject) => {
				if (req.session) {
					req.session.destroy(error => {
						if (error) {
							reject(error);
						}

						resolve();
					});
				} else {
					reject(new Error('No session was found'));
				}
			});

			return {
				success: true,
			};
		},
	},
};

export default resolvers;
