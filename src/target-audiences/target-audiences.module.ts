import { Module } from '@nestjs/common';
import { TargetAudiencesService } from './target-audiences.service';
import { TargetAudiencesController } from './target-audiences.controller';

@Module({
  imports: [],
  controllers: [TargetAudiencesController],
  providers: [TargetAudiencesService],
})
export class TargetAudiencesModule {}
