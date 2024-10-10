import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { FuncaoEnum } from 'src/common/enums/funcao.enum';
import { AtualizarVoluntarioDTO } from './atualizar-voluntario.dto';

export class AtualizarVoluntarioAdmDTO extends AtualizarVoluntarioDTO {
  @IsOptional()
  @IsBoolean()
  ativo: boolean;

  @IsOptional()
  @IsEnum(FuncaoEnum)
  funcao: number;
}
