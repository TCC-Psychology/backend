import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TriageService } from './triage.service';
import { Prisma } from '@prisma/client';

@Controller('triage')
export class TriageController {
  constructor(private readonly triageService: TriageService) {}

  @Post(':medicalAppointmentsId')
  create(
    @Body() triageCreate: Prisma.TriageCreateInput,
    @Param('medicalAppointmentsId') medicalAppointmentsId: string,
  ) {
    return this.triageService.create(
      triageCreate,
      Number(medicalAppointmentsId),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const triage = await this.triageService.findOne(Number(id));
    return triage;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTriage: Prisma.TriageUpdateInput,
  ) {
    return this.triageService.update(Number(id), updateTriage);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.triageService.remove(Number(id));
  }
}
