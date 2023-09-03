import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AppointmentStatus, Prisma } from '@prisma/client';

interface WhereConditions {
  client?: {
    id: number;
  };
  psychologist?: {
    id: number;
  };
}

@Injectable()
export class MedicalAppointmentService {
  constructor(private prisma: PrismaService) {}

  async create(
    createMedicalAppointment: Prisma.MedicalAppointmentCreateInput,
    clienteId: number,
    psychologistId: number,
  ) {
    const medicalAppointmentService =
      await this.prisma.medicalAppointment.create({
        data: {
          ...createMedicalAppointment,
          psychologist: {
            connect: {
              id: psychologistId,
            },
          },
          client: {
            connect: {
              id: clienteId,
            },
          },
        },
      });

    return medicalAppointmentService;
  }

  async findAll(clientId: number, psychologistId: number) {
    const whereConditions: WhereConditions = {};

    if (clientId !== null) {
      whereConditions.client = {
        id: clientId,
      };
    }

    if (psychologistId !== null) {
      whereConditions.psychologist = {
        id: psychologistId,
      };
    }

    const medicalAppointmentUserRelated =
      await this.prisma.medicalAppointment.findMany({
        where: whereConditions,
      });

    return medicalAppointmentUserRelated;
  }

  async findOne(id: number) {
    const medicalAppointment = await this.prisma.medicalAppointment.findFirst({
      where: {
        id: id,
      },
    });

    return medicalAppointment;
  }

  async update(
    id: number,
    updateMedicalAppointment: Prisma.MedicalAppointmentUpdateInput,
  ) {
    await this.prisma.medicalAppointment.update({
      data: updateMedicalAppointment,
      where: {
        id: id,
      },
    });

    return 'A consulta foi atualizda';
  }

  async remove(id: number) {
    await this.prisma.medicalAppointment.delete({
      where: {
        id,
      },
    });

    return `A consulta foi removida!`;
  }

  async findAllByAppointmentStatus(
    clientId?: number | null,
    psychologistId?: number | null,
    appointmentStatus?: AppointmentStatus,
  ) {
    const whereConditions: WhereConditions = {};

    if (clientId !== null) {
      whereConditions.client = {
        id: clientId,
      };
    }

    if (psychologistId !== null) {
      whereConditions.psychologist = {
        id: psychologistId,
      };
    }

    const medicalAppointmentUserRelated =
      await this.prisma.medicalAppointment.findMany({
        where: {
          ...(whereConditions.client && {
            clientId: whereConditions.client.id,
          }),
          ...(whereConditions.psychologist && {
            psychologistId: whereConditions.psychologist.id,
          }),
          status: appointmentStatus,
        },
      });

    return medicalAppointmentUserRelated;
  }
}
