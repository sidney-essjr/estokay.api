import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from 'class-validator';

export class AtualizarSenhaDTO {
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @ApiProperty({ example: 'senhaAntiga', description: 'Senha atual do usuário' })
  senha: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @ApiProperty({ example: 'novaSenha', description: 'Nova senha do usuário' })
  novaSenha: string;
}
