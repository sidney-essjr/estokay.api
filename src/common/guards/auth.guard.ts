/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { VoluntarioService } from 'src/modules/voluntario/voluntario.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly voluntarioService: VoluntarioService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const token = request.cookies?.accessToken;

    if (!token) throw new UnauthorizedException('Acesso não autorizado');

    try {
      const data = this.authService.validarToken(token, 'login', 'voluntario');

      const voluntario = await this.voluntarioService.ler(data.id);

      if (!voluntario) throw new NotFoundException('Usuário não localizado');

      // adiciona dados do voluntario a request
      request.voluntario = voluntario;

      return true;
    } catch (_error) {
      throw new UnauthorizedException('Acesso não autorizado');
    }
  }
}
