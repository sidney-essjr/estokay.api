import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CriarDoacaoItemDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Arroz', description: 'Descrição do item' })
  descricao: string;
  
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 10, description: 'Quantidade do item' })
  quantidade: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Alimento', description: 'Categoria do item' })
  categoria: string;

  @IsString()
  @ApiProperty({ example: '1kg', description: 'Tamanho do item' })
  tamanho: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Kg', description: 'Unidade de medida do item' })
  medida: string;

  @Type(() => Date)
  @IsDate()
  @ApiProperty({ example: '2021-10-10', description: 'Data de validade do item' })
  validade: Date;
}

export class CriarDoacaoDTO {
  @IsNotEmpty()
  @ApiProperty({ example: 1, description: 'ID do doador' })
  doador: number;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ example: '2021-10-10', description: 'Data de entrada da doação' })
  dataEntrada: Date;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ type: [CriarDoacaoItemDTO], description: 'Itens da doação' })
  itens: CriarDoacaoItemDTO[];
}
