import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TargetAudiencesService {
  constructor(private prisma: PrismaService) {}

  create(targetAudience: Prisma.TargetAudienceCreateInput) {
    return this.prisma.targetAudience.create({
      data: {
        ...targetAudience,
      },
    });
  }

  findAll() {
    return this.prisma.targetAudience.findMany();
  }

  findOne(id: number) {
    return this.prisma.targetAudience.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, targetAudience: Prisma.TargetAudienceUpdateInput) {
    return this.prisma.targetAudience.update({
      data: targetAudience,
      where: {
        id: id,
      },
    });
  }
  s;

  connectPsychologist(userId: string, targetAudienceId: number) {
    return this.prisma.targetAudience.update({
      data: {
        psychologist: {
          connect: {
            userId: userId,
          },
        },
      },
      where: {
        id: targetAudienceId,
      },
    });
  }

  disconnectPsychologist(userId: string, targetAudienceId: number) {
    return this.prisma.targetAudience.update({
      data: {
        psychologist: {
          disconnect: {
            userId: userId,
          },
        },
      },
      where: {
        id: targetAudienceId,
      },
    });
  }

  remove(id: number) {
    return this.prisma.targetAudience.delete({
      where: {
        id: id,
      },
    });
  }
}
