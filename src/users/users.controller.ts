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
    const userCreated = await this.usersService.createUserAndClient(
      user,
      client,
    );

    return userCreated;
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
    return this.usersService.getUserByClientId(Number(clientId));
  }

  @Get('getUserByPsychologistId/:psychologistId')
  getUserByPsychologistId(@Param('psychologistId') psychologistId: string) {
    const user = this.usersService.getUserByPsychologistId(
      Number(psychologistId),
    );

    return user;
  }

  //Use essa rota para colocar varios params  nulaveis.  Exemplo : Email, numero, cpf e etc
  @Get('getUserByProperties/:cpf/:phone/:email')
  getUserByProperties(
    @Param('cpf') cpf: string,
    @Param('phone') phone: string,
    @Param('email') email: string,
  ) {
    return this.usersService.getUserByProperties(cpf, phone, email);
  }

  @Get('login/:phone/:password')
  canLogin(@Param('phone') phone: string, @Param('senha') password: string) {
    return this.usersService.canLogin(phone, password);
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
