import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service'; import { CreateAppointmentDto, UpdateAppointmentDto } from './dto/appointment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; import { RolesGuard } from '../auth/roles.guard'; import { Roles } from '../auth/roles.decorator';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly service: AppointmentsService) {}
  @Get() findAll(@Req() request: any) { return this.service.findAll(request.user); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number, @Req() request: any) { return this.service.findOne(id, request.user); }
  @Post() create(@Body() body: CreateAppointmentDto, @Req() request: any) { return this.service.create(body, request.user); }
  @Put(':id') updatePut(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateAppointmentDto, @Req() request: any) { return this.service.update(id, body, request.user); }
  @Patch(':id') updatePatch(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateAppointmentDto, @Req() request: any) { return this.service.update(id, body, request.user); }
  @Roles('admin', 'advisor') @Delete(':id') remove(@Param('id', ParseIntPipe) id: number, @Req() request: any) { return this.service.remove(id, request.user); }
}
