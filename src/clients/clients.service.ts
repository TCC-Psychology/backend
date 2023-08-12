import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  create(client: Prisma.ClientCreateInput) {
    return this.prisma.client.create({
      data: client,
    });
  }

  findAll() {
    return this.prisma.client.findMany();
  }

  findOne(id: number) {
    return this.prisma.client.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findOneForUserId(userId: number) {
    return await this.prisma.client.findUnique({
      where: {
        userId: userId,
      },
    });
  }

  update(id: number, client: Prisma.ClientUpdateInput) {
    return this.prisma.client.update({
      data: client,
      where: {
        id: id,
      },
    });
  }

  remove(id: number) {
    return this.prisma.client.delete({
      where: {
        id: id,
      },
    });
  }
}
