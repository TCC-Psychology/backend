import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { NotFoundException } from '@nestjs/common/exceptions';
import { UseFilters } from '@nestjs/common/decorators/core/exception-filters.decorator';
import { PrismaClientExceptionFilter } from 'src/prisma-client-exception/prisma-client-exception.filter';

@Controller('users')
@UseFilters(PrismaClientExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('createUserAndPsychologist')
  createUserAndPsychologist(
    @Body()
    data: {
      user: Prisma.UserCreateInput;
      psychologist: Prisma.PsychologistCreateInput;
    },
  ) {
    const { user, psychologist } = data;
    user.birthDate = user.birthDate?.toString();
    return this.usersService.createUserAndPsychologist(user, psychologist);
  }

  @Post('createUserAndClient')
  async createUserAndClient(
    @Body()
    data: {
      user: Prisma.UserCreateInput;
      client: Prisma.ClientCreateInput;
    },
  ) {
    const { user, client } = data;
    if (user.birthDate) {
      user.birthDate = user.birthDate + 'Z';
    }
    const usercriado = await this.usersService.createUserAndClient(
      user,
      client,
    );

    return usercriado;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get('getUserByClientId/:clientId')
  getUserByClientId(@Param('clientId') clientId: string) {
    return this.usersService.getUserByClientId(+clientId);
  }

  @Get('getUserByPsychologistId/:psychologistId')
  getUserByPsychologistId(@Param('psychologistId') psychologistId: string) {
    return this.usersService.getUserByPsychologistId(+psychologistId);
  }

  //Use essa rota para colocar varios params  nulaveis.  Exemplo : Email, numero, cpf e etc
  @Get('getUserByProperties/:cpf')
  getUserByProperties(@Param('cpf') cpf: string) {
    return this.usersService.getUserByProperties(cpf);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() user: Prisma.UserUpdateInput) {
    return this.usersService.update(+id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const user = this.usersService.remove(+id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
