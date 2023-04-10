import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PsychologistService {
  constructor(private prisma: PrismaService) {}

  create(psychologist: Prisma.PsychologistCreateInput) {
    return this.prisma.psychologist.create({
      data: psychologist,
    });
  }

  findAll() {
    return this.prisma.psychologist.findMany();
  }

  findOne(id: number) {
    return this.prisma.psychologist.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, psychologist: Prisma.PsychologistUpdateInput) {
    return this.prisma.psychologist.update({
      data: psychologist,
      where: {
        id: id,
      },
    });
  }

  remove(id: number) {
    return this.prisma.psychologist.delete({
      where: {
        id: id,
      },
    });
  }
}
