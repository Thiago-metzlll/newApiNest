// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // necessário para AuthModule usar
})
export class UsersModule {}
