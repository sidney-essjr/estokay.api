/* eslint-disable @typescript-eslint/no-unused-vars */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
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
    const { authorization } = request.headers;

    try {
      const data = this.authService.validarToken(
        (authorization ?? '').split(' ')[1],
      );

      const voluntario = await this.voluntarioService.ler(data.id);
      console.log(voluntario);

      request.voluntario = voluntario;

      return true;
    } catch (_error) {
      return false;
    }
  }
}
