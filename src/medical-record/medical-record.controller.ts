import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MedicalRecordService } from './medical-record.service';
import { Prisma } from '@prisma/client';

@Controller('medical-record')
export class MedicalRecordController {
  constructor(private readonly medicalRecordService: MedicalRecordService) {}

  @Post('/:psychologistId/:clientId?')
  create(
    @Body() medicalRecord: Prisma.MedicalRecordCreateInput,
    @Param('psychologistId') psychologistId: string,
    @Param('clientId') clientId: string,
  ) {
    return this.medicalRecordService.create(
      medicalRecord,
      Number(psychologistId),
      Number(clientId),
    );
  }

  @Get(':clientId/:psychologistId')
  async findAll(
    @Param('clientId') clientId: string,
    @Param('psychologistId') psychologistId: string,
  ) {
    return this.medicalRecordService.findAll(
      Number(clientId),
      Number(psychologistId),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalRecordService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() medicalRecord: Prisma.MedicalRecordUpdateInput,
  ) {
    return this.medicalRecordService.update(+id, medicalRecord);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalRecordService.remove(+id);
  }
}
