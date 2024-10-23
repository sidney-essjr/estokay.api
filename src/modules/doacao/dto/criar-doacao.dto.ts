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
  descricao: string;

  @IsNumber()
  @IsNotEmpty()
  quantidade: number;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsString()
  tamanho: string;

  @IsString()
  @IsNotEmpty()
  medida: string;

  @Type(() => Date)
  @IsDate()
  validade: Date;
}

export class CriarDoacaoDTO {
  @IsNotEmpty()
  doador: number;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  dataEntrada: Date;

  @IsArray()
  @IsNotEmpty()
  itens: CriarDoacaoItemDTO[];
}
