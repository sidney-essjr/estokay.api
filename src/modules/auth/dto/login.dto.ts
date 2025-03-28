import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty( { example: 'joao@email.com', description: 'Email do usuário' }) 
  email: string;

  @ApiProperty( { example: '123456', description: 'Senha do usuário' })
  @IsNotEmpty()
  senha: string;
}
