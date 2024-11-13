import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from 'src/common/guards/auth.guard';
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

  @Post('redefinir-senha')
  redefinirSenha(
    @Body() body: { token: string; novaSenha: string },
    @Res() res: Response,
  ) {
    return this.authService.redefinirSenha(body.token, body.novaSenha, res);
  }

  @UseGuards(AuthGuard)
  @Post('session-login')
  sessionLogin(@Req() req) {
    return this.authService.sessionLogin(req);
  }
}
