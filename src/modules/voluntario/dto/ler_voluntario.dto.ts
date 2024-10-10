import { Expose } from 'class-transformer';
import { FuncaoEnum } from 'src/common/enums/funcao.enum';

export class LerVoluntarioDTO {
  @Expose()
  id: number;

  @Expose()
  nome: string;

  @Expose()
  email: string;

  @Expose()
  telefone: string;

  @Expose()
  documento: string;

  @Expose()
  ativo: boolean;

  @Expose()
  funcao: FuncaoEnum;
}
