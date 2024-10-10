import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EsqueceuSenhaDTO } from './dto/esqueceu-senha.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() { email, senha }: LoginDTO) {
    return this.authService.login(email, senha);
  }

  @Post('esqueceu-senha')
  esqueceuSenha(@Body() { email }: EsqueceuSenhaDTO) {
    return this.authService.esqueceuSenha(email);
  }

  @Post('resetar-senha')
  resetarSenha() {}
}
