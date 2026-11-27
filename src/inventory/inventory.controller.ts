import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service'; import { CreateInventoryItemDto, UpdateInventoryItemDto } from './dto/inventory.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; import { RolesGuard } from '../auth/roles.guard'; import { Roles } from '../auth/roles.decorator';
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'advisor')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly service: InventoryService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }
  @Roles('admin', 'advisor') @Post() create(@Body() body: CreateInventoryItemDto) { return this.service.create(body); }
  @Roles('admin', 'advisor') @Put(':id') updatePut(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateInventoryItemDto) { return this.service.update(id, body); }
  @Roles('admin', 'advisor') @Patch(':id') updatePatch(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateInventoryItemDto) { return this.service.update(id, body); }
  @Roles('admin') @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}
