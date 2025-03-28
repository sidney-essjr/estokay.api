import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class EsqueceuSenhaDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({example: 'joao@email.com', description: 'E-mail do usuário'})
  email: string;
}
