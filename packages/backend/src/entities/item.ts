import { Column, Entity, ManyToOne } from 'typeorm';

import BaseEntity from './base-entity';
import Group from './group';

@Entity()
export default class Item extends BaseEntity {
	@Column()
	name: string;

	@ManyToOne(() => Group, group => group.items)
	group: Group;
}
