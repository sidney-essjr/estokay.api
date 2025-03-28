import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AdicionarDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Arroz', description: 'Nome do produto' })
  descricao: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 10, description: 'Quantidade do produto' })
  quantidade: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Alimento', description: 'Categoria do produto' })
  categoria: string;

  @IsString()
  @ApiProperty({ example: '1kg', description: 'Tamanho do produto' })
  tamanho: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Unidade', description: 'Unidade de medida do produto' })
  medida: string;

  @Type(() => Date)
  @IsDate()
  @ApiProperty({ example: '2021-10-10', description: 'Data de validade do produto' })
  validade: Date;
}
