import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Group from './group';

@Entity()
export default class Item {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@ManyToOne(() => Group, group => group.items)
	group: Group;
}
