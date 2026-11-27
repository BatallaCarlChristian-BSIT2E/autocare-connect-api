import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; import { Repository } from 'typeorm';
import { InventoryItem } from '../entities/inventory-item.entity';
import { CreateInventoryItemDto, UpdateInventoryItemDto } from './dto/inventory.dto';
@Injectable()
export class InventoryService {
  constructor(@InjectRepository(InventoryItem) private readonly repo: Repository<InventoryItem>) {}
  findAll() { return this.repo.find({ order: { itemName: 'ASC' } }); }
  async findOne(id: number) { const row = await this.repo.findOneBy({ id }); if (!row) throw new NotFoundException(`Inventory item ${id} not found`); return row; }
  async create(input: CreateInventoryItemDto) { return this.repo.save(this.repo.create({ ...input, unitPrice: input.unitPrice.toFixed(2) })); }
  async update(id: number, input: UpdateInventoryItemDto) { const row = await this.findOne(id); Object.assign(row, input); if (input.unitPrice !== undefined) row.unitPrice = Number(input.unitPrice).toFixed(2); return this.repo.save(row); }
  async remove(id: number) { const row = await this.repo.findOneBy({ id }); if (!row) return { id, deleted: true }; await this.repo.remove(row); return { id, deleted: true }; }
}
