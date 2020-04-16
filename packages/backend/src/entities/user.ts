import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

import Group from './group';

@Entity()
export default class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	name: string;

	@ManyToMany(() => Group)
	@JoinTable()
	groups: Group[];
}
