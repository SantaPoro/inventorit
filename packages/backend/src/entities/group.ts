import {
	Column,
	Entity,
	JoinColumn,
	ManyToMany,
	OneToMany,
	OneToOne,
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

	@ManyToMany(() => User)
	users: User[];

	@OneToOne(() => User)
	@JoinColumn()
	owner: User;

	@OneToMany(() => Item, item => item.group)
	items: Item[];
}
