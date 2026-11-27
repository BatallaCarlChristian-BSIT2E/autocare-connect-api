import { IsDateString } from 'class-validator';
export class RevenueQueryDto {
  @IsDateString() from: string;
  @IsDateString() to: string;
}
