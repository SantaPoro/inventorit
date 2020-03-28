import 'reflect-metadata';
import createApolloServer from './apollo';

(async function () {
	const server = await createApolloServer();

	server.listen(3000).then(({ url }) => {
		console.log(`Server ready at ${url}`);
	});
})();
