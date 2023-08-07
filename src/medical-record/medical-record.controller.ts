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

  @Get()
  findAll() {
    return this.medicalRecordService.findAll();
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
