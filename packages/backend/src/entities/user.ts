import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import Group from './group';

@Entity()
export default class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('uuid', { nullable: true })
	gammaId?: string;

	@Column({ nullable: true })
	githubId?: string;

	@Column({ nullable: true })
	googleId?: string;

	@Column()
	name: string;

	@ManyToMany(() => Group, group => group.users)
	groups: Group[];
}
