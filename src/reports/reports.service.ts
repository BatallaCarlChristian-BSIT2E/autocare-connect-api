import { BadRequestException, Injectable } from '@nestjs/common'; import { InjectRepository } from '@nestjs/typeorm'; import { Repository } from 'typeorm';
import { ServiceHistory } from '../entities/service-history.entity'; import { Appointment } from '../entities/appointment.entity'; import { RevenueQueryDto } from './dto/revenue-query.dto';
@Injectable()
export class ReportsService {
  constructor(@InjectRepository(ServiceHistory) private readonly history: Repository<ServiceHistory>, @InjectRepository(Appointment) private readonly appointments: Repository<Appointment>) {}
  async revenue(query: RevenueQueryDto) {
    if (query.from.slice(0, 10) > query.to.slice(0, 10)) throw new BadRequestException('from must be on or before to');
    const { totalRevenue } = await this.history.createQueryBuilder('record').select('COALESCE(SUM(record.totalCost), 0)', 'totalRevenue').where('record.dateCompleted >= :from AND record.dateCompleted <= :to', { from: query.from.slice(0, 10), to: query.to.slice(0, 10) }).getRawOne();
    const completedAppointments = await this.appointments.createQueryBuilder('appointment').where('appointment.status = :status', { status: 'completed' }).andWhere('DATE(appointment.scheduledAt) >= :from AND DATE(appointment.scheduledAt) <= :to', { from: query.from.slice(0, 10), to: query.to.slice(0, 10) }).getCount();
    return { from: query.from.slice(0, 10), to: query.to.slice(0, 10), totalRevenue: Number(totalRevenue), completedAppointments };
  }
}
