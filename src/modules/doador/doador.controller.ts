import { Controller, Get, UseGuards } from '@nestjs/common';
import { Funcoes } from 'src/common/decorators/funcao.decator';
import { FuncaoEnum } from 'src/common/enums/funcao.enum';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { FuncaoGuard } from 'src/common/guards/funcao.guard';
import { DoadorService } from './doador.service';

@UseGuards(AuthGuard, FuncaoGuard)
@Controller('doadores')
export class DoadorController {
  constructor(private readonly doadorService: DoadorService) {}

  @Funcoes(FuncaoEnum.USUARIO, FuncaoEnum.ADMIN)
  @Get()
  async lerTodos() {
    return this.doadorService.lerTodos();
  }
}
