import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FuncaoEnum } from '../enums/funcao.enum';
import { KEY_FUNCAO } from '../decorators/funcao.decator';
import { Voluntario } from 'src/modules/voluntario/entity/voluntario.entity';

@Injectable()
export class FuncaoGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const funcaoRequerida = this.reflector.getAllAndOverride<FuncaoEnum[]>(
      KEY_FUNCAO,
      [context.getHandler(), context.getClass()],
    );

    const { voluntario } = context.switchToHttp().getRequest() as {
      voluntario: Voluntario;
    };

    return funcaoRequerida.includes(voluntario.funcao);
  }
}
