import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';

export const Voluntario = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (request.voluntario) {
      if (filter) {
        return request.voluntario[filter];
      } else {
        return request.voluntario;
      }
    } else {
      throw new NotFoundException(
        'Os dados do voluntario não foram localizados na requisição Esse decorator deve ser utilizado junto ao AuthGuard',
      );
    }
  },
);
