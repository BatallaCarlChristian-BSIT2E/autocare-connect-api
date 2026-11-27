import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto, UpdateVehicleDto } from './dto/vehicle.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; import { RolesGuard } from '../auth/roles.guard'; import { Roles } from '../auth/roles.decorator';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly service: VehiclesService) {}
  @Get() findAll(@Req() request: any) { return this.service.findAll(request.user); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number, @Req() request: any) { return this.service.findOne(id, request.user); }
  @Post() create(@Body() body: CreateVehicleDto, @Req() request: any) { return this.service.create(body, request.user); }
  @Put(':id') updatePut(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateVehicleDto, @Req() request: any) { return this.service.update(id, body, request.user); }
  @Patch(':id') updatePatch(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateVehicleDto, @Req() request: any) { return this.service.update(id, body, request.user); }
  @Roles('admin') @Delete(':id') remove(@Param('id', ParseIntPipe) id: number, @Req() request: any) { return this.service.remove(id, request.user); }
}
