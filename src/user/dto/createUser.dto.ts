// src/users/dto/createUser.dto.ts
import { IsEmail, IsNotEmpty, IsString, MinLength, IsNumber, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name: string;

  @IsEmail({}, { message: 'O email deve ser válido.' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'A cidade é obrigatória.' })
  city: string;

  @IsNumber({}, { message: 'A idade deve ser um número.' })
  @Min(0, { message: 'A idade não pode ser negativa.' })
  yearsOld: number;

  @IsString()
  descriptionUser: string;

  @IsString()
  preferences: string;

  @IsString()
  socialMedia: string;
}
