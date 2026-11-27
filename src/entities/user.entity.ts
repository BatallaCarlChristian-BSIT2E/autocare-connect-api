import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export type UserRole = 'customer' | 'advisor' | 'admin';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn() id: number;
  @Column({ length: 120 }) name: string;
  @Column({ unique: true, length: 150 }) email: string;
  @Column({ name: 'password_hash', select: false, length: 255 }) passwordHash: string;
  @Column({ type: 'enum', enum: ['customer', 'advisor', 'admin'], default: 'customer' }) role: UserRole;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}
