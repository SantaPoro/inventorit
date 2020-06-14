import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

import BaseEntity from './base-entity';
import Item from './item';
import User from './user';

@Entity()
export default class Group extends BaseEntity {
	@Column('uuid', { unique: true })
	gammaId: string;

	@Column()
	name: string;

	@ManyToMany(() => User, user => user.groups)
	@JoinTable()
	users: User[];

	@OneToMany(() => Item, item => item.group)
	items: Item[];
}
