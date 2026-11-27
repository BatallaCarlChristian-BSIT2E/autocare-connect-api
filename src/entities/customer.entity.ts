import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { Appointment } from './appointment.entity';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn() id: number;
  @Column({ name: 'first_name', length: 50 }) firstName: string;
  @Column({ name: 'last_name', length: 55 }) lastName: string;
  @Column({ length: 15, unique: true }) phone: string;
  @Column({ length: 100, unique: true }) email: string;
  @OneToMany(() => Vehicle, (vehicle) => vehicle.customer) vehicles: Vehicle[];
  @OneToMany(() => Appointment, (appointment) => appointment.customer) appointments: Appointment[];
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}
