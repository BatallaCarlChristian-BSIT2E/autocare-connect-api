import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateInventoryItemDto {
  @IsString() @MaxLength(100) itemName: string;
  @IsString() @MaxLength(50) sku: string;
  @Type(() => Number) @IsInt() @Min(0) quantityInStock: number;
  @Type(() => Number) @IsNumber() @Min(0) unitPrice: number;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) reorderLevel?: number;
}
export class UpdateInventoryItemDto extends PartialType(CreateInventoryItemDto) {}
