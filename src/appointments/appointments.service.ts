import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';
import { Customer } from '../entities/customer.entity';
import { Vehicle } from '../entities/vehicle.entity';
import { Service } from '../entities/service.entity';
import { User } from '../entities/user.entity';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto/appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(@InjectRepository(Appointment) private readonly repo: Repository<Appointment>, @InjectRepository(Customer) private readonly customers: Repository<Customer>, @InjectRepository(Vehicle) private readonly vehicles: Repository<Vehicle>, @InjectRepository(Service) private readonly services: Repository<Service>) {}
  findAll(user: User) { const qb = this.repo.createQueryBuilder('appointment').leftJoinAndSelect('appointment.customer', 'customer').leftJoinAndSelect('appointment.vehicle', 'vehicle').leftJoinAndSelect('appointment.service', 'service').orderBy('appointment.scheduledAt', 'ASC'); if (user.role === 'customer') qb.where('customer.email = :email', { email: user.email }); return qb.getMany(); }
  async findOne(id: number, user: User) { const row = await this.repo.findOne({ where: { id }, relations: { customer: true, vehicle: true, service: true } }); if (!row) throw new NotFoundException(`Appointment ${id} not found`); this.assertOwner(row, user); return row; }
  private assertOwner(row: Appointment, user: User) { if (user.role === 'customer' && row.customer.email.toLowerCase() !== user.email.toLowerCase()) throw new ForbiddenException('You can only access your own appointments'); }
  private async linkedRecords(customerId: number, vehicleId: number, user: User) {
    const [customer, vehicle] = await Promise.all([this.customers.findOneBy({ id: customerId }), this.vehicles.findOneBy({ id: vehicleId })]);
    if (!customer) throw new NotFoundException(`Customer ${customerId} not found`);
    if (!vehicle) throw new NotFoundException(`Vehicle ${vehicleId} not found`);
    if (vehicle.customerId !== customer.id) throw new BadRequestException('The selected vehicle does not belong to this customer');
    if (user.role === 'customer' && customer.email.toLowerCase() !== user.email.toLowerCase()) throw new ForbiddenException('You can only book appointments for your own vehicles');
    return { customer, vehicle };
  }
  async create(input: CreateAppointmentDto, user: User) { const { customer, vehicle } = await this.linkedRecords(input.customerId, input.vehicleId, user); const service = await this.services.findOneBy({ id: input.serviceId, isActive: true }); if (!service) throw new NotFoundException(`Active service ${input.serviceId} not found`); return this.repo.save(this.repo.create({ ...input, serviceDescription: input.serviceDescription ?? service.serviceName, scheduledAt: new Date(input.scheduledAt), customer, vehicle, service })); }
  async update(id: number, input: UpdateAppointmentDto, user: User) {
    const row = await this.findOne(id, user); const customerId = input.customerId ?? row.customerId; const vehicleId = input.vehicleId ?? row.vehicleId;
    const { customer, vehicle } = await this.linkedRecords(customerId, vehicleId, user);
    const serviceId = input.serviceId ?? row.serviceId;
    const service = await this.services.findOneBy({ id: serviceId, isActive: true });
    if (!service) throw new NotFoundException(`Active service ${serviceId} not found`);
    Object.assign(row, input, { customer, vehicle, service, serviceDescription: input.serviceDescription ?? (input.serviceId ? service.serviceName : row.serviceDescription), scheduledAt: input.scheduledAt ? new Date(input.scheduledAt) : row.scheduledAt });
    return this.repo.save(row);
  }
  async remove(id: number, user: User) { const row = await this.repo.findOne({ where: { id }, relations: { customer: true, vehicle: true, service: true } }); if (!row) return { id, deleted: true }; this.assertOwner(row, user); await this.repo.remove(row); return { id, deleted: true }; }
}
