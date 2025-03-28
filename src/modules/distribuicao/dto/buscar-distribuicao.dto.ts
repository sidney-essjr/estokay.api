import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional } from 'class-validator';

export class BuscarDistribuicaoDTO {
  @IsDate()
  @IsOptional()
  @ApiProperty({ example: '2021-01-01', description: 'Data de início da distribuição' })
  dataInicio: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty({ example: '2021-01-01', description: 'Data de fim da distribuição' })
  dataFim: Date;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 1, description: 'ID do voluntário' })
  voluntario: number;
}
