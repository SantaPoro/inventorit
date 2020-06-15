import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import BaseEntity from './base-entity';
import Group from './group';

@Entity()
export default class Item extends BaseEntity {
	@Column()
	name: string;

	@Column()
	amount: number;

	@ManyToOne(() => Group, group => group.items, { nullable: false })
	@JoinColumn({ name: 'groupId' })
	group: Group;

	@Column({ nullable: false })
	groupId: string;
}
