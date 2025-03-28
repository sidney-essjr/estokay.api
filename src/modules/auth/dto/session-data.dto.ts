import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SessionDataDTO {
  @Expose()
  @ApiProperty({ example: 1, description: 'ID do usuário' })
  id: number;

  @Expose()
  @ApiProperty({ example: 'João', description: 'Nome do usuário' })
  nome: string;

  @Expose()
  @ApiProperty({ example: 'joao@email.com', description: 'Sobrenome do usuário' })
  email: string;

  @Expose()
  @ApiProperty({ example: '123456', description: 'Telefone do usuário' })
  telefone: string;

  @Expose()
  @ApiProperty({ example: '123456', description: 'Documento do usuário' })
  documento: string;

  @Expose()
  @ApiProperty({ example: true, description: 'Usuário ativo' })
  ativo: boolean;

  @Expose()
  @ApiProperty({ example: 'admin', description: 'Função do usuário  0 - admin, 1 - user' })
  funcao: string;
}
