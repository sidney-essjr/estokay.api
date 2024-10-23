import { Expose } from 'class-transformer';

export class SessionDataDTO {
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
  funcao: string;
}
