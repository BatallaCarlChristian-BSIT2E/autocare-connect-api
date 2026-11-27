import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateVehicleDto {
  @IsString() @MaxLength(60) make: string;
  @IsString() @MaxLength(60) model: string;
  @Type(() => Number) @IsInt() @Min(1886) @Max(2100) year: number;
  @IsString() @MaxLength(20) licensePlate: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) mileage?: number;
  @Type(() => Number) @IsInt() @Min(1) customerId: number;
}
export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {}
