import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Appointment } from './appointment.entity';
import { Reminder } from './reminder.entity';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn() id: number;
  @Column({ name: 'service_name', length: 120 }) serviceName: string;
  @Column({ type: 'text', nullable: true }) description?: string;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 }) price: string;
  @Column({ name: 'duration_minutes', type: 'int', default: 60 }) durationMinutes: number;
  @Column({ name: 'is_active', default: true }) isActive: boolean;
  @OneToMany(() => Appointment, (appointment) => appointment.service) appointments: Appointment[];
  @OneToMany(() => Reminder, (reminder) => reminder.service) reminders: Reminder[];
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}
