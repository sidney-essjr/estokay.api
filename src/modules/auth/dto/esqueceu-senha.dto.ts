import { IsEmail, IsNotEmpty } from 'class-validator';

export class EsqueceuSenhaDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
