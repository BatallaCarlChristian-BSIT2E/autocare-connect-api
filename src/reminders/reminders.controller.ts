import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, Req, UseGuards } from '@nestjs/common'; import { RemindersService } from './reminders.service'; import { CreateReminderDto, ReminderQueryDto, UpdateReminderDto } from './dto/reminder.dto'; import { JwtAuthGuard } from '../auth/jwt-auth.guard'; import { RolesGuard } from '../auth/roles.guard'; import { Roles } from '../auth/roles.decorator';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reminders')
export class RemindersController {
  constructor(private readonly service: RemindersService) {}
  @Get('vehicles/reminders') getVehicleReminders(@Query() query: ReminderQueryDto, @Req() request: any) { return this.service.findAll(query, request.user); }
  @Get() findAll(@Query() query: ReminderQueryDto, @Req() request: any) { return this.service.findAll(query, request.user); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number, @Req() request: any) { return this.service.findOne(id, request.user); }
  @Roles('admin', 'advisor') @Post() create(@Body() body: CreateReminderDto, @Req() request: any) { return this.service.create(body, request.user); }
  @Roles('admin', 'advisor') @Put(':id') updatePut(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateReminderDto, @Req() request: any) { return this.service.update(id, body, request.user); }
  @Roles('admin', 'advisor') @Patch(':id') updatePatch(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateReminderDto, @Req() request: any) { return this.service.update(id, body, request.user); }
  @Roles('admin', 'advisor') @Delete(':id') remove(@Param('id', ParseIntPipe) id: number, @Req() request: any) { return this.service.remove(id, request.user); }
}
