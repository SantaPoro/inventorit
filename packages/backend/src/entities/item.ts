import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Group from './group';

@Entity()
class Item {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@ManyToOne(() => Group, group => group.items)
	group: Group;
}

export default Item;
