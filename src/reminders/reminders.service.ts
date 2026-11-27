import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'; import { InjectRepository } from '@nestjs/typeorm'; import { Repository } from 'typeorm';
import { Reminder, ReminderStatus } from '../entities/reminder.entity'; import { Vehicle } from '../entities/vehicle.entity'; import { Service } from '../entities/service.entity'; import { User } from '../entities/user.entity'; import { CreateReminderDto, ReminderQueryDto, UpdateReminderDto } from './dto/reminder.dto';
@Injectable()
export class RemindersService {
  constructor(@InjectRepository(Reminder) private readonly repo: Repository<Reminder>, @InjectRepository(Vehicle) private readonly vehicles: Repository<Vehicle>, @InjectRepository(Service) private readonly services: Repository<Service>) {}
  async findAll(query: ReminderQueryDto, user: User) {
    const page = Math.max(1, query.page || 1); const limit = Math.min(100, Math.max(1, query.limit || 10));
    const qb = this.repo.createQueryBuilder('reminder').leftJoinAndSelect('reminder.vehicle', 'vehicle').leftJoinAndSelect('vehicle.customer', 'customer').leftJoinAndSelect('reminder.service', 'service');
    if (query.status) qb.andWhere('reminder.status = :status', { status: query.status });
    if (query.vehicleId) qb.andWhere('reminder.vehicleId = :vehicleId', { vehicleId: query.vehicleId });
    if (user.role === 'customer') qb.andWhere('customer.email = :email', { email: user.email });
    const [data, total] = await qb.orderBy('reminder.dueDate', 'ASC').skip((page - 1) * limit).take(limit).getManyAndCount();
    return { page, limit, total, data };
  }
  async findOne(id: number, user: User) {
    const row = await this.repo.findOne({ where: { id }, relations: { vehicle: { customer: true }, service: true } });
    if (!row) throw new NotFoundException(`Reminder ${id} not found`);
    this.assertOwner(row, user); return row;
  }
  private assertOwner(row: Reminder, user: User) { if (user.role === 'customer' && row.vehicle.customer.email.toLowerCase() !== user.email.toLowerCase()) throw new ForbiddenException('You can only access reminders for your own vehicles'); }
  private async references(vehicleId: number, serviceId: number, user: User) {
    const [vehicle, service] = await Promise.all([this.vehicles.findOne({ where: { id: vehicleId }, relations: { customer: true } }), this.services.findOneBy({ id: serviceId, isActive: true })]);
    if (!vehicle) throw new NotFoundException(`Vehicle ${vehicleId} not found`);
    if (!service) throw new NotFoundException(`Active service ${serviceId} not found`);
    if (user.role === 'customer' && vehicle.customer.email.toLowerCase() !== user.email.toLowerCase()) throw new ForbiddenException('You can only create reminders for your own vehicles');
    return { vehicle, service };
  }
  async create(input: CreateReminderDto, user: User) { const { vehicle, service } = await this.references(input.vehicleId, input.serviceId, user); return this.repo.save(this.repo.create({ ...input, dueDate: input.dueDate.slice(0, 10), vehicle, service })); }
  async update(id: number, input: UpdateReminderDto, user: User) { const row = await this.findOne(id, user); const { vehicle, service } = await this.references(input.vehicleId ?? row.vehicleId, input.serviceId ?? row.serviceId, user); Object.assign(row, input, { vehicle, service, dueDate: input.dueDate ? input.dueDate.slice(0, 10) : row.dueDate }); if (input.status === 'sent' && !row.sentAt) row.sentAt = new Date(); return this.repo.save(row); }
  async remove(id: number, user: User) { const row = await this.repo.findOne({ where: { id }, relations: { vehicle: { customer: true }, service: true } }); if (!row) return { id, deleted: true }; this.assertOwner(row, user); await this.repo.remove(row); return { id, deleted: true }; }
  async updateStatus(id: number, status: ReminderStatus, user: User) { const row = await this.findOne(id, user); row.status = status; if (status === 'sent') row.sentAt = new Date(); return this.repo.save(row); }
}
