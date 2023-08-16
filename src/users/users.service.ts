import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUserAndPsychologist(
    user: Prisma.UserCreateInput,
    psychologist: Prisma.PsychologistCreateInput,
  ) {
    return this.prisma.user.create({
      data: {
        ...user,
        psychologist: {
          create: psychologist,
        },
      },
    });
  }

  async createUserAndClient(
    user: Prisma.UserCreateInput,
    client: Prisma.ClientCreateInput,
  ) {
    const userCriado = await this.prisma.user.create({
      data: {
        ...user,
        client: {
          create: client,
        },
      },
    });

    return userCriado;
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async getUserByClientId(clientId: number): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        client: {
          id: clientId,
        },
      },
    });

    return user;
  }

  async getUserByPsychologistId(psychologistId: number): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        psychologist: {
          id: psychologistId,
        },
      },
    });

    return user;
  }

  async getUserByProperties(cpf: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        cpf: cpf,
      },
    });

    return user;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return user;
  }

  update(id: string, user: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      data: user,
      where: {
        id,
      },
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
