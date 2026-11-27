import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ServiceHistoryService } from './service-history.service'; import { CreateServiceHistoryDto, UpdateServiceHistoryDto } from './dto/service-history.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; import { RolesGuard } from '../auth/roles.guard'; import { Roles } from '../auth/roles.decorator';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('service-history')
export class ServiceHistoryController {
  constructor(private readonly service: ServiceHistoryService) {}
  @Get() findAll(@Req() request: any) { return this.service.findAll(request.user); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number, @Req() request: any) { return this.service.findOne(id, request.user); }
  @Roles('admin', 'advisor') @Post() create(@Body() body: CreateServiceHistoryDto, @Req() request: any) { return this.service.create(body, request.user); }
  @Roles('admin', 'advisor') @Put(':id') updatePut(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateServiceHistoryDto, @Req() request: any) { return this.service.update(id, body, request.user); }
  @Roles('admin', 'advisor') @Patch(':id') updatePatch(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateServiceHistoryDto, @Req() request: any) { return this.service.update(id, body, request.user); }
  @Roles('admin', 'advisor') @Delete(':id') remove(@Param('id', ParseIntPipe) id: number, @Req() request: any) { return this.service.remove(id, request.user); }
}
