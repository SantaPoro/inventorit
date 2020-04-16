import { Field, ID, ObjectType } from 'type-graphql';

import Group from '../group/group';

@ObjectType()
export default class User {
	@Field(() => ID)
	id: string;

	@Field()
	email: string;

	@Field()
	name: string;

	@Field()
	groups: Group[];
}
