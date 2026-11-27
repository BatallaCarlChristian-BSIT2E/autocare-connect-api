import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Customer } from './customer.entity';
import { Vehicle } from './vehicle.entity';
import { Service } from './service.entity';
import { ServiceHistory } from './service-history.entity';

export type AppointmentStatus = 'pending' | 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn() id: number;
  @ManyToOne(() => Customer, (customer) => customer.appointments, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'customer_id' }) customer: Customer;
  @Column({ name: 'customer_id' }) customerId: number;
  @ManyToOne(() => Vehicle, (vehicle) => vehicle.appointments, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'vehicle_id' }) vehicle: Vehicle;
  @Column({ name: 'vehicle_id' }) vehicleId: number;
  @ManyToOne(() => Service, (service) => service.appointments, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'service_id' }) service: Service;
  @Column({ name: 'service_id' }) serviceId: number;
  @Column({ name: 'scheduled_at', type: 'datetime' }) scheduledAt: Date;
  @Column({ name: 'service_description', length: 500 }) serviceDescription: string;
  @Column({ type: 'enum', enum: ['pending', 'scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled'], default: 'pending' }) status: AppointmentStatus;
  @Column({ type: 'text', nullable: true }) notes?: string;
  @OneToMany(() => ServiceHistory, (record) => record.appointment) serviceHistory: ServiceHistory[];
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}
