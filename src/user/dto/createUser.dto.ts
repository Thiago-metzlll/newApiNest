// src/users/dto/createUser.dto.ts
import { 
  IsEmail, 
  IsNotEmpty, 
  IsString, 
  MinLength, 
  IsNumber, 
  Min, 
  IsOptional 
} from 'class-validator';

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

  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string.' })
  descriptionUser?: string;

  @IsOptional()
  @IsString({ message: 'As preferências devem ser uma string.' })
  preferences?: string;

  @IsOptional()
  @IsString({ message: 'As redes sociais devem ser uma string.' })
  socialMedia?: string;
}
