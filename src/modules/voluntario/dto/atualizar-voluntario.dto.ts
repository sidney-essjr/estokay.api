import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: 'João', description: 'Nome do voluntário' })
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: 'voluntario@email.com', description: 'Email do voluntário' })
  email: string;

  @IsOptional()
  @IsPhoneNumber('BR')
  @ApiProperty({ example: '51999999999', description: 'Telefone do voluntário' })
  telefone: string;

  @IsCPF()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ example: '000.000.000-00', description: 'CPF do voluntário' })
  documento: string;
}
