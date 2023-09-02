import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  createForClient(
    notification: Prisma.NotificationCreateInput,
    clientId: number,
  ) {
    return this.prisma.notification.create({
      data: {
        ...notification,
        client: {
          connect: {
            id: clientId,
          },
        },
      },
    });
  }

  createForPsychologist(
    notification: Prisma.NotificationCreateInput,
    psychologistId: number,
  ) {
    return this.prisma.notification.create({
      data: {
        ...notification,
        psychologist: {
          connect: {
            id: psychologistId,
          },
        },
      },
    });
  }

  findAll(filter: Prisma.NotificationWhereInput) {
    return this.prisma.notification.findMany({
      where: filter,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.notification.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, notification: Prisma.NotificationUpdateInput) {
    return this.prisma.notification.update({
      data: {
        ...notification,
      },
      where: {
        id: id,
      },
    });
  }

  remove(id: number) {
    return this.prisma.notification.delete({
      where: {
        id: id,
      },
    });
  }
}
