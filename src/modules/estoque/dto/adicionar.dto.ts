import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AdicionarDTO {
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsNumber()
  @IsNotEmpty()
  quantidade: number;

  @IsString()
  @IsNotEmpty()
  categoria: string;

  @IsString()
  tamanho: string;

  @IsString()
  @IsNotEmpty()
  medida: string;

  @Type(() => Date)
  @IsDate()
  validade: Date;
}
