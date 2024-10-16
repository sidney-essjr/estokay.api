import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { EsqueceuSenhaDTO } from './dto/esqueceu-senha.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() { email, senha }: LoginDTO, @Res() res: Response) {
    this.authService.login(email, senha, res);
    return res.status(HttpStatus.OK).json();
  }

  @Post('esqueceu-senha')
  esqueceuSenha(@Body() { email }: EsqueceuSenhaDTO, @Res() res: Response) {
    this.authService.esqueceuSenha(email);
    return res.status(HttpStatus.OK).json();
  }

  @Post('redefinir-senha')
  redefinirSenha() {}
}
