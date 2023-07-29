import { Module } from '@nestjs/common';
import { SegmentOfActivityService } from './segment-of-activity.service';
import { SegmentOfActivityController } from './segment-of-activity.controller';

@Module({
  imports: [],
  controllers: [SegmentOfActivityController],
  providers: [SegmentOfActivityService],
})
export class SegmentOfActivityModule {}
