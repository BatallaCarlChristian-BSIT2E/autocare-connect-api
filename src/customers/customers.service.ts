import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { User } from '../entities/user.entity';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';

@Injectable()
export class CustomersService {
  constructor(@InjectRepository(Customer) private readonly repo: Repository<Customer>) {}
  findAll(user: User) { return this.repo.find({ where: user.role === 'customer' ? { email: user.email } : {}, order: { id: 'DESC' } }); }
  async findOne(id: number, user: User) { const row = await this.repo.findOne({ where: { id }, relations: { vehicles: true } }); if (!row) throw new NotFoundException(`Customer ${id} not found`); this.assertOwner(row, user); return row; }
  async create(input: CreateCustomerDto, user: User) { if (user.role === 'customer' && input.email.toLowerCase() !== user.email.toLowerCase()) throw new ForbiddenException('A customer account can only create its own profile'); return this.repo.save(this.repo.create(input)); }
  async update(id: number, input: UpdateCustomerDto, user: User) { const row = await this.findOne(id, user); if (user.role === 'customer' && input.email && input.email.toLowerCase() !== user.email.toLowerCase()) throw new ForbiddenException('A customer account cannot change its profile email'); Object.assign(row, input); return this.repo.save(row); }
  async remove(id: number, user: User) { const row = await this.repo.findOne({ where: { id }, relations: { vehicles: true } }); if (!row) return { id, deleted: true }; this.assertOwner(row, user); try { await this.repo.remove(row); } catch { throw new ConflictException('Remove this customer’s vehicles and appointments before deleting the customer'); } return { id, deleted: true }; }
  private assertOwner(row: Customer, user: User) { if (user.role === 'customer' && row.email.toLowerCase() !== user.email.toLowerCase()) throw new ForbiddenException('You can only access your own customer profile'); }
}
