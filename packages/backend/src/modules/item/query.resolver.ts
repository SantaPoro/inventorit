import { Query, Resolver } from 'type-graphql';
import Item from './item';

@Resolver(Item)
export class QueryItemResolver {
	@Query(() => [Item])
	async items(): Promise<Item[]> {
		return [
			{
				id: '1',
				name: 'Dinos klocka',
			},
		];
	}
}
