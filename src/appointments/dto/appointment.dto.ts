import { Type } from 'class-transformer';
import { IsDateString, IsIn, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { AppointmentStatus } from '../../entities/appointment.entity';
export class CreateAppointmentDto {
  @Type(() => Number) @IsInt() @Min(1) customerId: number;
  @Type(() => Number) @IsInt() @Min(1) vehicleId: number;
  @Type(() => Number) @IsInt() @Min(1) serviceId: number;
  @IsDateString() scheduledAt: string;
  @IsOptional() @IsString() @MaxLength(500) serviceDescription?: string;
  @IsOptional() @IsIn(['pending', 'scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled']) status?: AppointmentStatus;
  @IsOptional() @IsString() notes?: string;
}
export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {}
