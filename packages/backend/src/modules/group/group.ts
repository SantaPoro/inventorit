import { Field, ID, ObjectType } from 'type-graphql';

import Item from '../item/item';
import User from '../user/user';

@ObjectType()
export default class Group {
	@Field(() => ID)
	id: string;

	@Field()
	name: string;

	@Field()
	users: User[];

	@Field()
	owner: User;

	@Field()
	items: Item[];
}
