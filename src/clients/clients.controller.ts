import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Prisma } from '@prisma/client';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() client: Prisma.ClientCreateInput) {
    return this.clientsService.create(client);
  }

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @Get('getClientByUserId/:userId')
  findOneByUserId(@Param('userId') userId: string) {
    return this.clientsService.findOneByUserId(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() client: Prisma.ClientUpdateInput) {
    return this.clientsService.update(Number(id), client);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}
