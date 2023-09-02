import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UsersController } from 'src/users/users.controller';
import { AcademicFormationService } from './academic-formation.service';
import { PsychologistController } from 'src/psychologist/psychologist.controller';

@Controller('academic-formation')
export class AcademicFormationController {
  constructor(
    private readonly academicFormationService: AcademicFormationService,
    private readonly userClient: UsersController,
    private readonly psychologistClient: PsychologistController,
  ) {}

  @Post(':userId')
  async create(
    @Param('userId') userId: string,
    @Body() createAcademicFormationDto: Prisma.AcademicFormationCreateInput,
  ) {
    const psychologist = await this.psychologistClient.findOneByUserId(userId);
    if (!psychologist) {
      return 'O psicologo não foi encontrado!';
    }

    return this.academicFormationService.create(
      createAcademicFormationDto,
      psychologist.id,
    );
  }

  @Get()
  findAll() {
    return this.academicFormationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const academicFormation = this.academicFormationService.findOne(
      Number.parseInt(id),
    );

    if (!academicFormation) {
      return 'Não foi encontrado formação acadêmica com o id informado.';
    }

    return academicFormation;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAcademicFormationDto: Prisma.AcademicFormationUpdateInput,
  ) {
    const academicFormationExits = await this.academicFormationService.findOne(
      Number(id),
    );
    if (!academicFormationExits) {
      return 'A formação acadêmica não foi encontrada';
    }
    return await this.academicFormationService.update(
      Number(id),
      updateAcademicFormationDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const academicFormation = await this.academicFormationService.findOne(
      Number(id),
    );
    if (!academicFormation) {
      return 'A formação acadêmica não existe';
    }

    return this.academicFormationService.remove(Number(id));
  }
}
