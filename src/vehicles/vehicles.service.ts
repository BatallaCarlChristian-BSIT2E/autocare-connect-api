import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { Customer } from '../entities/customer.entity';
import { User } from '../entities/user.entity';
import { CreateVehicleDto, UpdateVehicleDto } from './dto/vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(@InjectRepository(Vehicle) private readonly repo: Repository<Vehicle>, @InjectRepository(Customer) private readonly customers: Repository<Customer>) {}
  findAll(user: User) { const qb = this.repo.createQueryBuilder('vehicle').leftJoinAndSelect('vehicle.customer', 'customer').orderBy('vehicle.id', 'DESC'); if (user.role === 'customer') qb.where('customer.email = :email', { email: user.email }); return qb.getMany(); }
  async findOne(id: number, user: User) { const row = await this.repo.findOne({ where: { id }, relations: { customer: true } }); if (!row) throw new NotFoundException(`Vehicle ${id} not found`); this.assertOwner(row, user); return row; }
  async create(input: CreateVehicleDto, user: User) { const customer = await this.customers.findOneBy({ id: input.customerId }); if (!customer) throw new NotFoundException(`Customer ${input.customerId} not found`); this.assertCustomerOwner(customer, user); return this.repo.save(this.repo.create({ ...input, customer })); }
  async update(id: number, input: UpdateVehicleDto, user: User) { const row = await this.findOne(id, user); if (input.customerId !== undefined) { const customer = await this.customers.findOneBy({ id: input.customerId }); if (!customer) throw new NotFoundException(`Customer ${input.customerId} not found`); this.assertCustomerOwner(customer, user); row.customer = customer; row.customerId = customer.id; } Object.assign(row, input); return this.repo.save(row); }
  async remove(id: number, user: User) { const row = await this.repo.findOne({ where: { id }, relations: { customer: true } }); if (!row) return { id, deleted: true }; this.assertOwner(row, user); try { await this.repo.remove(row); } catch { throw new ConflictException('Remove this vehicle’s appointments, service records, and reminders before deleting the vehicle'); } return { id, deleted: true }; }
  private assertOwner(row: Vehicle, user: User) { this.assertCustomerOwner(row.customer, user); }
  private assertCustomerOwner(customer: Customer, user: User) { if (user.role === 'customer' && customer.email.toLowerCase() !== user.email.toLowerCase()) throw new ForbiddenException('You can only access your own vehicles'); }
}
