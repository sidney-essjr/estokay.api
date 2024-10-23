import { IsNotEmpty, IsPhoneNumber, IsString, Matches } from 'class-validator';

export class CriarDoadorDTO {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsPhoneNumber('BR')
  telefone: string;

  @IsString()
  @Matches(/^\d{8}$/, { message: 'Formato de código postal inválido' })
  codigoPostal: string;

  @IsString()
  endereco: string;

  @IsString()
  bairro: string;

  @IsString()
  @IsNotEmpty()
  cidade: string;

  @IsString()
  @IsNotEmpty()
  estado: string;
}
