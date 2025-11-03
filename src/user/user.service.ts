// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { users } from './model/bancoDadosUser';
import type { User } from './model/loginModel';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  private users: User[] = users;

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException('Usuário não encontrado.');
    return user;
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email === email);
  }

  create(data: CreateUserDto): User {
    const newUser: User = {
      id: this.users.length + 1,
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, data: UpdateUserDto): User {
    const user = this.findOne(id);
    Object.assign(user, data);
    return user;
  }

  remove(id: number) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) throw new NotFoundException('Usuário não encontrado.');
    this.users.splice(index, 1);
    return { message: 'Usuário removido com sucesso.' };
  }
}
