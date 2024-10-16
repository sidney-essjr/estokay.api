import { IsJWT, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class RedefinirSenhaDTO {
  @IsJWT()
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  novaSenha: string;
}
