import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MedicalAppointmentService } from './medical-appointment.service';
import { Prisma } from '@prisma/client';
import { ClientsService } from 'src/clients/clients.service';
import { PsychologistService } from 'src/psychologist/psychologist.service';

@Controller('medical-appointment')
export class MedicalAppointmentController {
  constructor(
    private readonly medicalAppointmentService: MedicalAppointmentService,
    private readonly clienteService: ClientsService,
    private readonly psychologistService: PsychologistService,
  ) {}

  @Post(':clientId/:psychologistId')
  async create(
    @Body() createMedicalAppointment: Prisma.MedicalAppointmentCreateInput,
    @Param('clientId') clientId: string,
    @Param('psychologistId') psychologistId: string,
  ) {
    if (clientId == 'null' || psychologistId == 'null')
      return 'O paciente ou psicólogo devem ser informados';

    const cliente = await this.clienteService.findOne(Number(clientId));
    if (!cliente) {
      return 'O cliente não existe!';
    }

    const psychologist = await this.psychologistService.findOne(
      Number(psychologistId),
    );
    if (!psychologist) {
      return 'O psicólogo não existe!';
    }

    if (createMedicalAppointment.date) {
      createMedicalAppointment.date = createMedicalAppointment.date + 'Z';
    }
    return this.medicalAppointmentService.create(
      createMedicalAppointment,
      Number(clientId),
      Number(psychologistId),
    );
  }

  @Get(':clientId/:psychologistId')
  async findAll(
    @Param('clientId') clientId: string,
    @Param('psychologistId') psychologistId: string,
  ) {
    if (clientId == 'null' && psychologistId == 'null')
      return 'O paciente ou o psicólogo deve ser informados';

    if (clientId != 'null') {
      const cliente = await this.clienteService.findOne(Number(clientId));
      if (!cliente) {
        return 'O cliente não existe!';
      }
    }

    if (psychologistId != 'null') {
      const psychologist = await this.psychologistService.findOne(
        Number(psychologistId),
      );
      if (!psychologist) {
        return 'O psicólogo não existe!';
      }
    }

    return this.medicalAppointmentService.findAll(
      clientId != 'null' ? Number(clientId) : null,
      psychologistId != 'null' ? Number(psychologistId) : null,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalAppointmentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMedicalAppointment: Prisma.MedicalAppointmentUpdateInput,
  ) {
    return this.medicalAppointmentService.update(
      Number(id),
      updateMedicalAppointment,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalAppointmentService.remove(Number(id));
  }
}
