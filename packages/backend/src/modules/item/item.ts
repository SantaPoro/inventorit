import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export default class Item {
	@Field(() => ID)
	id: string;

	@Field()
	name: string;
}
