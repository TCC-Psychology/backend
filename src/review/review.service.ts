import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  create(
    review: Prisma.ReviewCreateInput,
    clientId: number,
    psychologistId: number,
  ) {
    return this.prisma.review.create({
      data: {
        ...review,
        client: {
          connect: {
            id: clientId,
          },
        },
        psychologist: {
          connect: {
            id: psychologistId,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.review.findMany();
  }

  findOne(id: number) {
    return this.prisma.review.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, review: Prisma.ReviewUpdateInput) {
    return this.prisma.review.update({
      data: {
        ...review,
      },
      where: {
        id: id,
      },
    });
  }

  remove(id: number) {
    return this.prisma.review.delete({
      where: {
        id: id,
      },
    });
  }
}
