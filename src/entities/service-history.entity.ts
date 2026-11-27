import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { Appointment } from './appointment.entity';

@Entity('service_history')
export class ServiceHistory {
  @PrimaryGeneratedColumn() id: number;
  @ManyToOne(() => Appointment, (appointment) => appointment.serviceHistory, { onDelete: 'RESTRICT', nullable: true })
  @JoinColumn({ name: 'appointment_id' }) appointment?: Appointment;
  @Column({ name: 'appointment_id', nullable: true }) appointmentId?: number;
  @ManyToOne(() => Vehicle, (vehicle) => vehicle.serviceHistory, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'vehicle_id' }) vehicle: Vehicle;
  @Column({ name: 'vehicle_id' }) vehicleId: number;
  @Column({ length: 500 }) description: string;
  @Column({ name: 'total_cost', type: 'decimal', precision: 10, scale: 2, default: 0 }) totalCost: string;
  @Column({ name: 'date_completed', type: 'date' }) dateCompleted: string;
  @Column({ type: 'int', nullable: true }) mileage?: number;
  @Column({ name: 'next_due_date', type: 'date', nullable: true }) nextDueDate?: string;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}
