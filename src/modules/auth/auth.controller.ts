import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { EsqueceuSenhaDTO } from './dto/esqueceu-senha.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() { email, senha }: LoginDTO, @Res() res: Response) {
    return this.authService.login(email, senha, res);
  }

  @Post('esqueceu-senha')
  esqueceuSenha(@Body() { email }: EsqueceuSenhaDTO) {
    return this.authService.esqueceuSenha(email);
  }

  @Post('resetar-senha')
  resetarSenha() {}
}
