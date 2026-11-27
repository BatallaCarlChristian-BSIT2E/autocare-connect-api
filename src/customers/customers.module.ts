import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entity';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { RolesGuard } from '../auth/roles.guard';
@Module({ imports: [TypeOrmModule.forFeature([Customer])], controllers: [CustomersController], providers: [CustomersService, RolesGuard] })
export class CustomersModule {}
