import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { IsCPF } from 'src/common/decorators/cpf.validator';

export class CriarVoluntarioDTO {
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  senha: string;

  @IsPhoneNumber('BR')
  telefone: string;

  @IsCPF()
  @IsNotEmpty()
  documento: string;
}
