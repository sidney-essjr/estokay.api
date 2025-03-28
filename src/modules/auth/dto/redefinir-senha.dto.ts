import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class RedefinirSenhaDTO {
  @IsJWT()
  @IsNotEmpty()
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9', description: 'Token de redefinição de senha' })
  token: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @ApiProperty({ example: 'NovaSenha@123', description: 'Nova senha do usuário' })
  novaSenha: string;
}
