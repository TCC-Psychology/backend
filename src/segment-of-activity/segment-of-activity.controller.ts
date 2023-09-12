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
import { SegmentOfActivityService } from './segment-of-activity.service';
import { Prisma } from '@prisma/client';

@Controller('segment-of-activity')
export class SegmentOfActivityController {
  constructor(
    private readonly segmentOfActivityService: SegmentOfActivityService,
  ) {}

  @Post()
  create(@Body() segmentOfActivity: Prisma.SegmentOfActivityCreateInput) {
    return this.segmentOfActivityService.create(segmentOfActivity);
  }

  @Get()
  findAll() {
    return this.segmentOfActivityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.segmentOfActivityService.findOne(+id);
  }

  @Post('connectPsychologist')
  connectPsychologist(
    @Query('userId') userId: string,
    @Query('segmentOfActivityId') segmentOfActivityId: string,
  ) {
    return this.segmentOfActivityService.connectPsychologist(
      userId,
      Number(segmentOfActivityId),
    );
  }

  @Post('disconnectPsychologist')
  disconnectPsychologist(
    @Query('userId') userId: string,
    @Query('segmentOfActivityId') segmentOfActivityId: string,
  ) {
    return this.segmentOfActivityService.disconnectPsychologist(
      userId,
      Number(segmentOfActivityId),
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() segmentOfActivity: Prisma.SegmentOfActivityUpdateInput,
  ) {
    return this.segmentOfActivityService.update(+id, segmentOfActivity);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.segmentOfActivityService.remove(+id);
  }
}
