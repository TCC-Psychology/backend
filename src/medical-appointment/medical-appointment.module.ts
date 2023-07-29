import { Module } from '@nestjs/common';
import { MedicalAppointmentService } from './medical-appointment.service';
import { MedicalAppointmentController } from './medical-appointment.controller';
import { ClientsService } from 'src/clients/clients.service';
import { PsychologistService } from 'src/psychologist/psychologist.service';

@Module({
  imports: [],
  controllers: [MedicalAppointmentController],
  providers: [MedicalAppointmentService, ClientsService, PsychologistService],
})
export class MedicalAppointmentModule {}
