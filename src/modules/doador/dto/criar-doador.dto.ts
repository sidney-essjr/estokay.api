import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString, Matches } from 'class-validator';

export class CriarDoadorDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty( { example: 'João' , description: 'Nome do doador' })
  nome: string;

  @IsPhoneNumber('BR')
  @ApiProperty( { example: '51999999999' , description: 'Telefone do doador' })
  telefone: string;

  @IsString()
  @Matches(/^\d{8}$/, { message: 'Formato de código postal inválido' })
  @ApiProperty( { example: '99999999' , description: 'Código postal do doador' })
  codigoPostal: string;

  @IsString()
  @ApiProperty( { example: 'Rua das Flores' , description: 'Endereço do doador' })
  endereco: string;

  @IsString()
  @ApiProperty( { example: 'Centro' , description: 'Bairro do doador' })
  bairro: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty( { example: 'Porto Alegre' , description: 'Cidade do doador' })
  cidade: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty( { example: 'RS' , description: 'Estado do doador' })
  estado: string;
}
