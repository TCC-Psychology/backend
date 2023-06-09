import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PsychologistModule } from './psychologist/psychologist.module';
import { ClientsModule } from './clients/clients.module';
import { TargetAudiencesModule } from './target-audiences/target-audiences.module';
import { AcademicFormationModule } from './academic-formation/academic-formation.module';
import { SegmentOfActivityModule } from './segment-of-activity/segment-of-activity.module';
import { MedicalRecordModule } from './medical-record/medical-record.module';
import { TriageModule } from './triage/triage.module';
import { MedicalAppointmentModule } from './medical-appointment/medical-appointment.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ReviewModule } from './review/review.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    UsersModule,
    PsychologistModule,
    ClientsModule,
    TargetAudiencesModule,
    AcademicFormationModule,
    SegmentOfActivityModule,
    MedicalRecordModule,
    TriageModule,
    MedicalAppointmentModule,
    NotificationsModule,
    ReviewModule,
    FirebaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
