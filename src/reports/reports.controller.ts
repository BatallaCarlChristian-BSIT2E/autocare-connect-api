import { Controller, Get, Query, UseGuards } from '@nestjs/common'; import { ReportsService } from './reports.service'; import { RevenueQueryDto } from './dto/revenue-query.dto'; import { JwtAuthGuard } from '../auth/jwt-auth.guard'; import { RolesGuard } from '../auth/roles.guard'; import { Roles } from '../auth/roles.decorator';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly service: ReportsService) {}
  @Roles('admin') @Get('revenue') revenue(@Query() query: RevenueQueryDto) { return this.service.revenue(query); }
}
