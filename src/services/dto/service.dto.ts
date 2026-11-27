import { Type } from 'class-transformer'; import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator'; import { PartialType } from '@nestjs/mapped-types';
export class CreateServiceDto {
  @IsString() @MaxLength(120) serviceName: string;
  @IsOptional() @IsString() description?: string;
  @Type(() => Number) @IsNumber() @Min(0) price: number;
  @Type(() => Number) @IsInt() @Min(1) durationMinutes: number;
  @IsOptional() @IsBoolean() isActive?: boolean;
}
export class UpdateServiceDto extends PartialType(CreateServiceDto) {}
