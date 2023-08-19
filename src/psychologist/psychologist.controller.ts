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

@Controller('psychologist')
export class PsychologistController {
  constructor(private readonly psychologistService: PsychologistService) {}

  @Post()
  create(@Body() psychologist: Prisma.PsychologistCreateInput) {
    return this.psychologistService.create(psychologist);
  }

  @Get()
  findAll() {
    return this.psychologistService.findAll();
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
}
