import {
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

import Item from './item';
import User from './user';

@Entity()
export default class Group {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@ManyToMany(() => User, user => user.groups)
	@JoinTable()
	users: User[];

	@ManyToOne(() => User)
	@JoinColumn()
	owner: User;

	@OneToMany(() => Item, item => item.group)
	items: Item[];
}
