import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  senha: string;
}
