import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PsychologistService } from './psychologist.service';
import { Prisma } from '@prisma/client';
import { FindAllDto } from './dto/find-all-psychologist.dto';

@Controller('psychologist')
export class PsychologistController {
  constructor(private readonly psychologistService: PsychologistService) {}

  @Post()
  create(@Body() psychologist: Prisma.PsychologistCreateInput) {
    return this.psychologistService.create(psychologist);
  }

  @Post('findAllPsychologists')
  findAll(@Body() data: FindAllDto) {
    return this.psychologistService.findAll(
      data.targetAudienceIds,
      data.segmentOfActivityIds,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.psychologistService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() psychologist: Prisma.PsychologistUpdateInput,
  ) {
    return this.psychologistService.update(+id, psychologist);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.psychologistService.remove(+id);
  }

  @Get('findOneByUserId/:userId')
  async findOneByUserId(@Param('userId') id: string) {
    const userPsychologist = await this.psychologistService.findOneByUserId(id);

    return userPsychologist;
  }

  @Get(':userId/:relation')
  async getPsychologistRelations(
    @Param('userId') userId: string,
    @Param('relation') relation: 'targetAudiences' | 'segmentOfActivities',
  ) {
    return this.psychologistService.findPsychologistRelations(userId, relation);
  }
}
