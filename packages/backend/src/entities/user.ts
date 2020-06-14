import { Column, Entity, ManyToMany } from 'typeorm';

import BaseEntity from './base-entity';
import Group from './group';

@Entity()
export default class User extends BaseEntity {
	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column({ unique: true })
	gammaId: string;

	@ManyToMany(() => Group, group => group.users)
	groups: Group[];
}
