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
import { AcademicFormationService } from './academic-formation.service';

@Controller('academic-formation')
export class AcademicFormationController {
  constructor(
    private readonly academicFormationService: AcademicFormationService,
  ) {}

  @Post(':psychologistId')
  async create(
    @Param('psychologistId') psychologistId: string,
    @Body() createAcademicFormationDto: Prisma.AcademicFormationCreateInput,
  ) {
    return this.academicFormationService.create(
      createAcademicFormationDto,
      Number(psychologistId),
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

  @Get('getAcademic-formation/:psychologistId')
  findAllByPsychologist(@Param('psychologistId') psychologistId: string) {
    return this.academicFormationService.findAllByPsychologist(
      Number(psychologistId),
    );
  }
}
