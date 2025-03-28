import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';
import { IsCPF } from 'src/common/decorators/cpf.validator';

class ItemDistribuicaoDTO {
  @IsNumber()
  @ApiProperty({example: 1, description: 'ID do item de doação'})
  itemDoacao: number;

  @IsNumber()
  @ApiProperty({example: 1, description: 'Quantidade do item de doação'})
  quantidade: number;
}

export class CriarDistribuicaoDTO {
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  @ApiProperty({example: 'João', description: 'Nome do destinatário'})
  nome: string;

  @IsCPF()
  @IsNotEmpty()
  @ApiProperty({example: '123.456.789-00', description: 'CPF do destinatário'})
  documento: string;

  @IsNotEmpty()
  @ApiProperty({example: 'Rua A', description: 'Endereço do destinatário'})
  itemDistribuicao: ItemDistribuicaoDTO[];
}
