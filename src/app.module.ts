import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ServiceHistoryModule } from './service-history/service-history.module';
import { InventoryModule } from './inventory/inventory.module';
import { ServicesModule } from './services/services.module';
import { RemindersModule } from './reminders/reminders.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './entities/user.entity';
import { Customer } from './entities/customer.entity';
import { Vehicle } from './entities/vehicle.entity';
import { Appointment } from './entities/appointment.entity';
import { ServiceHistory } from './entities/service-history.entity';
import { InventoryItem } from './entities/inventory-item.entity';
import { Service } from './entities/service.entity';
import { Reminder } from './entities/reminder.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql' as const,
        host: config.get<string>('DB_HOST', 'localhost'),
        port: Number(config.get('DB_PORT', 3306)),
        username: config.get<string>('DB_USERNAME', 'root'),
        password: config.get<string>('DB_PASSWORD', ''),
        database: config.get<string>('DB_DATABASE', 'autocare_connect'),
        entities: [User, Customer, Vehicle, Service, Appointment, ServiceHistory, InventoryItem, Reminder],
        synchronize: config.get('DB_SYNCHRONIZE', 'false') === 'true',
        charset: 'utf8mb4',
      }),
    }),
    AuthModule,
    CustomersModule,
    VehiclesModule,
    AppointmentsModule,
    ServiceHistoryModule,
    InventoryModule,
    ServicesModule,
    RemindersModule,
    ReportsModule,
  ],
})
export class AppModule {}
