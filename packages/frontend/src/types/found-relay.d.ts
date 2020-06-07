declare module 'found-relay' {
	import { Environment } from 'react-relay';
	import { Match, Resolver as FoundResolver } from 'found';

	class Resolver implements FoundResolver {
		constructor(environment: Environment);

		resolveElements(match: Match): AsyncIterableIterator<React.ReactElement | null>;
	}

	export { Resolver };
}
