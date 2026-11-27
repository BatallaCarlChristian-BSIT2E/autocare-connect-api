import { Injectable, NotFoundException } from '@nestjs/common'; import { InjectRepository } from '@nestjs/typeorm'; import { Repository } from 'typeorm';
import { Service } from '../entities/service.entity'; import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';
@Injectable()
export class ServicesService {
  constructor(@InjectRepository(Service) private readonly repo: Repository<Service>) {}
  findAll() { return this.repo.find({ where: { isActive: true }, order: { serviceName: 'ASC' } }); }
  async findOne(id: number) { const row = await this.repo.findOneBy({ id }); if (!row) throw new NotFoundException(`Service ${id} not found`); return row; }
  async create(input: CreateServiceDto) { return this.repo.save(this.repo.create({ ...input, price: input.price.toFixed(2) })); }
  async update(id: number, input: UpdateServiceDto) { const row = await this.findOne(id); Object.assign(row, input); if (input.price !== undefined) row.price = Number(input.price).toFixed(2); return this.repo.save(row); }
  async remove(id: number) { const row = await this.repo.findOneBy({ id }); if (!row || !row.isActive) return { id, deleted: true }; row.isActive = false; await this.repo.save(row); return { id, deleted: true }; }
}
