import { Module } from '@nestjs/common'; import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from '../entities/appointment.entity'; import { Customer } from '../entities/customer.entity'; import { Vehicle } from '../entities/vehicle.entity'; import { Service } from '../entities/service.entity';
import { AppointmentsController } from './appointments.controller'; import { AppointmentsService } from './appointments.service'; import { RolesGuard } from '../auth/roles.guard';
@Module({ imports: [TypeOrmModule.forFeature([Appointment, Customer, Vehicle, Service])], controllers: [AppointmentsController], providers: [AppointmentsService, RolesGuard] })
export class AppointmentsModule {}
