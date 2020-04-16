import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

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

	@ManyToMany(() => Group)
	@JoinTable()
	groups: Group[];
}
