import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateServiceHistoryDto {
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) appointmentId?: number;
  @Type(() => Number) @IsInt() @Min(1) vehicleId: number;
  @IsString() @MaxLength(500) description: string;
  @Type(() => Number) @IsNumber() @Min(0) totalCost: number;
  @IsDateString() dateCompleted: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) mileage?: number;
  @IsOptional() @IsDateString() nextDueDate?: string;
}
export class UpdateServiceHistoryDto extends PartialType(CreateServiceHistoryDto) {}
