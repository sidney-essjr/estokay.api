import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { IsCPF } from 'src/common/decorators/cpf.validator';

export class CriarVoluntarioDTO {
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  @ApiProperty({ example: 'João', description: 'Nome do voluntário' })
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'voluntario@email.com', description: 'Email do voluntário' })
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @ApiProperty({ example: 'senha', description: 'Senha do voluntário' })
  senha: string;

  @IsString()
  @ApiProperty({ example: '51999999999', description: 'Telefone do voluntário' })
  telefone: string;

  @IsCPF()
  @IsNotEmpty()
  @ApiProperty({ example: '000.000.000-00', description: 'CPF do voluntário' })
  documento: string;
}
