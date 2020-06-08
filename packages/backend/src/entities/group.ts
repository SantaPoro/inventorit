import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

import BaseEntity from './base-entity';
import Item from './item';
import User from './user';

@Entity()
export default class Group extends BaseEntity {
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
