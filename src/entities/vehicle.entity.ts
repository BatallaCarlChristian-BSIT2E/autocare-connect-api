import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Customer } from './customer.entity';
import { Appointment } from './appointment.entity';
import { ServiceHistory } from './service-history.entity';
import { Reminder } from './reminder.entity';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn() id: number;
  @Column({ length: 60 }) make: string;
  @Column({ length: 60 }) model: string;
  @Column({ type: 'smallint' }) year: number;
  @Column({ name: 'license_plate', unique: true, length: 20 }) licensePlate: string;
  @Column({ type: 'int', default: 0 }) mileage: number;
  @ManyToOne(() => Customer, (customer) => customer.vehicles, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'customer_id' }) customer: Customer;
  @Column({ name: 'customer_id' }) customerId: number;
  @OneToMany(() => Appointment, (appointment) => appointment.vehicle) appointments: Appointment[];
  @OneToMany(() => ServiceHistory, (record) => record.vehicle) serviceHistory: ServiceHistory[];
  @OneToMany(() => Reminder, (reminder) => reminder.vehicle) reminders: Reminder[];
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}
