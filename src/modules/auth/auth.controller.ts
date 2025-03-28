import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AuthService } from './auth.service';
import { EsqueceuSenhaDTO } from './dto/esqueceu-senha.dto';
import { LoginDTO } from './dto/login.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
  @Post('login')
  login(@Body() { email, senha }: LoginDTO, @Res() res: Response) {
    return this.authService.login(email, senha, res);
  }

  @ApiOperation({ summary: 'Esqueceu senha' })
  @ApiResponse({ status: 200, description: 'E-mail enviado com sucesso' })
  @Post('esqueceu-senha')
  esqueceuSenha(@Body() { email }: EsqueceuSenhaDTO) {
    return this.authService.esqueceuSenha(email);
  }

  @ApiOperation({ summary: 'Redefinir senha' })
  @ApiResponse({ status: 200, description: 'Senha redefinida com sucesso' })
  @ApiBody({ schema: { type: 'object', properties: { token: { type: 'string' }, novaSenha: { type: 'string' } } } })
  @Post('redefinir-senha')
  redefinirSenha(
    @Body() body: { token: string; novaSenha: string },
    @Res() res: Response,
  ) {
    return this.authService.redefinirSenha(body.token, body.novaSenha, res);
  }

  @ApiOperation({ summary: 'Logout' })
  @ApiResponse({ status: 200, description: 'Logout realizado com sucesso' })
  @UseGuards(AuthGuard)
  @Post('session-login')
  sessionLogin(@Req() req) {
    return this.authService.sessionLogin(req);
  }
}
