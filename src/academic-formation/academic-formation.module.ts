import { Module } from '@nestjs/common';
import { AcademicFormationService } from './academic-formation.service';
import { AcademicFormationController } from './academic-formation.controller';
import { PrismaService } from 'prisma/prisma.service';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [],
  controllers: [AcademicFormationController],
  providers: [
    AcademicFormationService,
    PrismaService,
    UsersController,
    UsersService,
  ],
})
export class AcademicFormationModule {}
