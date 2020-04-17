import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import Group from './group';

@Entity()
export default class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('uuid')
	gammaId: string;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@ManyToMany(() => Group, group => group.users)
	groups: Group[];
}
