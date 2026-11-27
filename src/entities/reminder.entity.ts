import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { Service } from './service.entity';

export type ReminderStatus = 'pending' | 'sent' | 'dismissed';

@Entity('reminders')
export class Reminder {
  @PrimaryGeneratedColumn() id: number;
  @ManyToOne(() => Vehicle, (vehicle) => vehicle.reminders, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'vehicle_id' }) vehicle: Vehicle;
  @Column({ name: 'vehicle_id' }) vehicleId: number;
  @ManyToOne(() => Service, (service) => service.reminders, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'service_id' }) service: Service;
  @Column({ name: 'service_id' }) serviceId: number;
  @Column({ name: 'due_date', type: 'date' }) dueDate: string;
  @Column({ type: 'enum', enum: ['pending', 'sent', 'dismissed'], default: 'pending' }) status: ReminderStatus;
  @Column({ name: 'sent_at', type: 'datetime', nullable: true }) sentAt?: Date;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}
