import { Column, Entity, ManyToMany } from 'typeorm';

import BaseEntity from './base-entity';
import Group from './group';

@Entity()
export default class Player extends BaseEntity {
	@Column()
	name: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@ManyToMany(() => Group, group => group.users)
	groups: Group[];
}
