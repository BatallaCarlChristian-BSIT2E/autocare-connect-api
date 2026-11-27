import { Module } from '@nestjs/common'; import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from '../entities/vehicle.entity'; import { Customer } from '../entities/customer.entity';
import { VehiclesController } from './vehicles.controller'; import { VehiclesService } from './vehicles.service'; import { RolesGuard } from '../auth/roles.guard';
@Module({ imports: [TypeOrmModule.forFeature([Vehicle, Customer])], controllers: [VehiclesController], providers: [VehiclesService, RolesGuard] })
export class VehiclesModule {}
