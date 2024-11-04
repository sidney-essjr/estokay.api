import { IsDate, IsNumber, IsOptional } from 'class-validator';

export class BuscarDistribuicaoDTO {
  @IsDate()
  @IsOptional()
  dataInicio: Date;

  @IsDate()
  @IsOptional()
  dataFim: Date;

  @IsNumber()
  @IsOptional()
  voluntario: number;
}
