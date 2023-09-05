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

  @Post('createForClient')
  createForClient(
    @Body()
    data: {
      notification: Prisma.NotificationCreateInput;
      clientId?: string;
    },
  ) {
    const { notification, clientId } = data;

    return this.notificationsService.createForClient(
      notification,
      Number(clientId),
    );
  }

  @Post('createForPsychologist')
  createForPsychologist(
    @Body()
    data: {
      notification: Prisma.NotificationCreateInput;
      psychologistId: string;
    },
  ) {
    const { notification, psychologistId } = data;

    return this.notificationsService.createForPsychologist(
      notification,
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
