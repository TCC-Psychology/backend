import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AcademicFormationService {
  constructor(private prisma: PrismaService) {}

  async create(
    createAcademicFormationDto: Prisma.AcademicFormationCreateInput,
    psychologistId: number,
  ) {
    const academicFormation = await this.prisma.academicFormation.create({
      data: {
        ...createAcademicFormationDto,
        psychologist: {
          connect: {
            id: psychologistId,
          },
        },
      },
    });

    return academicFormation.id;
  }

  findAll() {
    return this.prisma.academicFormation.findMany();
  }

  async findOne(id: number) {
    const academicFormation = await this.prisma.academicFormation.findFirst({
      where: {
        id: id,
      },
    });

    return academicFormation;
  }

  async update(
    id: number,
    updateAcademicFormationDto: Prisma.AcademicFormationUpdateInput,
  ) {
    await this.prisma.academicFormation.update({
      data: updateAcademicFormationDto,
      where: {
        id: id,
      },
    });

    return `A formação academica foi atualiza`;
  }

  async remove(id: number) {
    await this.prisma.academicFormation.delete({
      where: {
        id,
      },
    });

    return `A formação acadêmica foi removida!`;
  }

  async findAllByPsychologist(psychologistId: number) {
    const list = await this.prisma.academicFormation.findMany({
      where: {
        psychologist: {
          id: psychologistId,
        },
      },
    });

    return list;
  }
}
