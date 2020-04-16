import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

import Group from './group';

@Entity()
class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	name: string;

	@ManyToMany(() => Group)
	@JoinTable()
	groups: User[];
}

export default User;
