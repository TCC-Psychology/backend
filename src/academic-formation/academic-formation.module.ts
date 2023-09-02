import { Module } from '@nestjs/common';
import { AcademicFormationService } from './academic-formation.service';
import { AcademicFormationController } from './academic-formation.controller';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';
import { PsychologistController } from 'src/psychologist/psychologist.controller';
import { PsychologistService } from 'src/psychologist/psychologist.service';

@Module({
  imports: [],
  controllers: [AcademicFormationController],
  providers: [
    AcademicFormationService,
    UsersController,
    UsersService,
    PsychologistController,
    PsychologistService,
  ],
})
export class AcademicFormationModule {}
