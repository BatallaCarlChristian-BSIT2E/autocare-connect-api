import { Module } from '@nestjs/common'; import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryItem } from '../entities/inventory-item.entity'; import { InventoryController } from './inventory.controller'; import { InventoryService } from './inventory.service'; import { RolesGuard } from '../auth/roles.guard';
@Module({ imports: [TypeOrmModule.forFeature([InventoryItem])], controllers: [InventoryController], providers: [InventoryService, RolesGuard] })
export class InventoryModule {}
