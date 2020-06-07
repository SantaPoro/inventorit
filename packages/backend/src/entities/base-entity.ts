import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export default abstract class BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;
}
