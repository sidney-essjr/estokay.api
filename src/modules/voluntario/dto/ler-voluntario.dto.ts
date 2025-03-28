import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { FuncaoEnum } from 'src/common/enums/funcao.enum';

export class LerVoluntarioDTO {
  @Expose()
  @ApiProperty({ example: 1, description: 'Identificador do voluntário' })
  id: number;

  @Expose()
  @ApiProperty( { example: 'João', description: 'Nome do voluntário' })
  nome: string;

  @Expose()
  @ApiProperty( { example: '', description: 'Email do voluntário' })
  email: string;

  @Expose()
  @ApiProperty( { example: '51999999999', description: 'Telefone do voluntário' })
  telefone: string;

  @Expose()
  @ApiProperty( { example: '000.000.000-00', description: 'CPF do voluntário' })
  documento: string;

  @Expose()
  @ApiProperty( { example: true, description: 'Status do voluntário' })
  ativo: boolean;

  @Expose()
  @ApiProperty( { example: 'Rua das Flores', description: 'Endereço do voluntário' })
  funcao: FuncaoEnum;
}
