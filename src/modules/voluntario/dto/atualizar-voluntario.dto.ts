import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { IsCPF } from 'src/common/decorators/cpf.validator';

export class AtualizarVoluntarioDTO {
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  @IsOptional()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email: string;

  @IsOptional()
  @IsPhoneNumber('BR')
  telefone: string;

  @IsCPF()
  @IsNotEmpty()
  @IsOptional()
  documento: string;
}
