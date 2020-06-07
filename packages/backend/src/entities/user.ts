import { Column, Entity } from 'typeorm';

import BaseEntity from './base-entity';

@Entity()
export default class Player extends BaseEntity {
	@Column()
	name: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;
}
