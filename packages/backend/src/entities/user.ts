import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		length: 40,
	})
	name: string;

	@Column('text')
	team: string;

	@Column()
	borrowable: boolean;
}
