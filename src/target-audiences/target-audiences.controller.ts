import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TargetAudiencesService } from './target-audiences.service';
import { Prisma } from '@prisma/client';

@Controller('target-audiences')
export class TargetAudiencesController {
  constructor(
    private readonly targetAudiencesService: TargetAudiencesService,
  ) {}

  @Post()
  create(
    @Body()
    targetAudiences: Prisma.TargetAudienceCreateInput,
  ) {
    return this.targetAudiencesService.create(targetAudiences);
  }

  @Get()
  findAll() {
    return this.targetAudiencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.targetAudiencesService.findOne(Number(id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() targetAudiences: Prisma.TargetAudienceUpdateInput,
  ) {
    return this.targetAudiencesService.update(Number(id), targetAudiences);
  }

  @Post('connectPsychologist')
  connectPsychologist(
    @Query('userId') userId: string,
    @Query('targetAudienceId') targetAudienceId: string,
  ) {
    return this.targetAudiencesService.connectPsychologist(
      userId,
      Number(targetAudienceId),
    );
  }

  @Post('disconnectPsychologist')
  disconnectPsychologist(
    @Param('userId') userId: string,
    @Param('targetAudienceId') targetAudienceId: string,
  ) {
    return this.targetAudiencesService.disconnectPsychologist(
      userId,
      Number(targetAudienceId),
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.targetAudiencesService.remove(Number(id));
  }
}
