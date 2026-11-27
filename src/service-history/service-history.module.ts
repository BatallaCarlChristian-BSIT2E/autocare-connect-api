import { Module } from '@nestjs/common'; import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceHistory } from '../entities/service-history.entity'; import { Vehicle } from '../entities/vehicle.entity'; import { Appointment } from '../entities/appointment.entity';
import { ServiceHistoryController } from './service-history.controller'; import { ServiceHistoryService } from './service-history.service'; import { RolesGuard } from '../auth/roles.guard';
@Module({ imports: [TypeOrmModule.forFeature([ServiceHistory, Vehicle, Appointment])], controllers: [ServiceHistoryController], providers: [ServiceHistoryService, RolesGuard] })
export class ServiceHistoryModule {}
