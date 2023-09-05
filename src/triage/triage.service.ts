import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TriageService {
  constructor(private prisma: PrismaService) {}

  async create(
    createTriage: Prisma.TriageCreateInput,
    medicalAppointmentsId: number,
  ) {
    const triage = await this.prisma.triage.create({
      data: {
        ...createTriage,
        medicalAppointments: {
          connect: {
            id: medicalAppointmentsId,
          },
        },
      },
    });

    return triage;
  }

  async findOne(id: number) {
    const triage = await this.prisma.triage.findFirst({
      where: {
        medicalAppointmentId: id,
      },
    });

    return triage;
  }

  async update(id: number, updateTriage: Prisma.TriageUpdateInput) {
    await this.prisma.triage.update({
      data: updateTriage,
      where: {
        id: id,
      },
    });

    return 'A triagem foi atualizda';
  }

  async remove(id: number) {
    await this.prisma.triage.delete({
      where: {
        id,
      },
    });

    return `A triagem foi removida!`;
  }
}
