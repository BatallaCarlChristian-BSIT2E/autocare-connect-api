import { Type } from 'class-transformer'; import { IsDateString, IsIn, IsInt, IsOptional, Min } from 'class-validator'; import { PartialType } from '@nestjs/mapped-types'; import { ReminderStatus } from '../../entities/reminder.entity';
export class CreateReminderDto {
  @Type(() => Number) @IsInt() @Min(1) vehicleId: number;
  @Type(() => Number) @IsInt() @Min(1) serviceId: number;
  @IsDateString() dueDate: string;
  @IsOptional() @IsIn(['pending', 'sent', 'dismissed']) status?: ReminderStatus;
}
export class UpdateReminderDto extends PartialType(CreateReminderDto) {}
export class ReminderQueryDto {
  @IsOptional() @IsIn(['pending', 'sent', 'dismissed']) status?: ReminderStatus;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) vehicleId?: number;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) page = 1;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) limit = 10;
}
