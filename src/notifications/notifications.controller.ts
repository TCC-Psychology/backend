import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Prisma } from '@prisma/client';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('createForClient/:clientId')
  async createForClient(
    @Body() createNotification: Prisma.NotificationCreateInput,
    @Param('clientId') clientId: string,
  ) {
    return await this.notificationsService.createForClient(
      createNotification,
      Number(clientId),
    );
  }

  @Post('createForPsychologist/:psychologistId')
  async createForPsychologist(
    @Body() createNotification: Prisma.NotificationCreateInput,
    @Param('psychologistId') psychologistId: string,
  ) {
    return await this.notificationsService.createForPsychologist(
      createNotification,
      Number(psychologistId),
    );
  }

  @Post()
  findAll(@Body() filter: Prisma.NotificationWhereInput) {
    return this.notificationsService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() notification: Prisma.NotificationUpdateInput,
  ) {
    return this.notificationsService.update(+id, notification);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(+id);
  }
}
