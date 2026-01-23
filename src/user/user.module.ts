// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import {PrismaService} from '../prisma.service'

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService], // necessário para AuthModule usar
})
export class UsersModule {}
