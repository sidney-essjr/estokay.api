import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class VerificarIdMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    if (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0)
      throw new BadRequestException('Identificador inválido');

    next();
  }
}
