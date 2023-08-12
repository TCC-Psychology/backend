import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class MedicalRecordService {
  constructor(private prisma: PrismaService) {}

  async create(
    medicalRecord: Prisma.MedicalRecordCreateInput,
    psychologistId: number,
    clientId: number,
  ) {
    const data: Prisma.MedicalRecordCreateInput = {
      ...medicalRecord,
      psychologist: {
        connect: {
          id: psychologistId,
        },
      },
      client: {
        connect: {
          id: clientId,
        },
      },
    };

    return await this.prisma.medicalRecord.create({
      data: data,
    });
  }

  async findAll(clientId: number, psychologistId: number) {
    return await this.prisma.medicalRecord.findMany({
      where: {
        clientId: clientId,
        psychologistId: psychologistId,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.medicalRecord.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, medicalRecord: Prisma.MedicalRecordUpdateInput) {
    return this.prisma.medicalRecord.update({
      data: { ...medicalRecord },
      where: {
        id: id,
      },
    });
  }

  remove(id: number) {
    return this.prisma.medicalRecord.delete({
      where: {
        id: id,
      },
    });
  }
}
