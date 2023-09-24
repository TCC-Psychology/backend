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

  findAll(targetAudienceIds?: number[], segmentOfActivityIds?: number[]) {
    const whereInput: Prisma.PsychologistWhereInput = {};

    if (targetAudienceIds && targetAudienceIds.length) {
      whereInput.targetAudiences = {
        some: {
          id: {
            in: targetAudienceIds,
          },
        },
      };
    }

    if (segmentOfActivityIds && segmentOfActivityIds.length) {
      whereInput.segmentOfActivities = {
        some: {
          id: {
            in: segmentOfActivityIds,
          },
        },
      };
    }

    return this.prisma.psychologist.findMany({
      where: whereInput,
      include: {
        user: true,
        targetAudiences: true,
        segmentOfActivities: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.psychologist.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, psychologist: Prisma.PsychologistUpdateInput) {
    return await this.prisma.psychologist.update({
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

  async findOneByUserId(userId: string) {
    return await this.prisma.psychologist.findUnique({
      where: {
        userId: userId,
      },
    });
  }

  async findPsychologistRelations(
    userId: string,
    relation: 'targetAudiences' | 'segmentOfActivities',
  ) {
    const psychologist = await this.prisma.psychologist.findUnique({
      where: { userId: userId },
      include: { [relation]: true },
    });
    return psychologist ? psychologist[relation] : [];
  }
}
