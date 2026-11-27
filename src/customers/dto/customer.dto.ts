import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCustomerDto {
  @IsString() @MaxLength(50) firstName: string;
  @IsString() @MaxLength(55) lastName: string;
  @IsString() @MaxLength(15) phone: string;
  @IsEmail() @MaxLength(100) email: string;
}
export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
