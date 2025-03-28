import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { FuncaoEnum } from 'src/common/enums/funcao.enum';
import { AtualizarVoluntarioDTO } from './atualizar-voluntario.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AtualizarVoluntarioAdmDTO extends AtualizarVoluntarioDTO {
  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: true, description: 'Status do voluntário' })
  ativo: boolean;

  @IsOptional()
  @IsEnum(FuncaoEnum)
  @ApiProperty({ enum: FuncaoEnum, example: FuncaoEnum.ADMIN, description: 'Função do voluntário' })
  funcao: number;
}
