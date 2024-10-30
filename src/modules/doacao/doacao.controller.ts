import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Funcoes } from 'src/common/decorators/funcao.decator';
import { FuncaoEnum } from 'src/common/enums/funcao.enum';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { FuncaoGuard } from 'src/common/guards/funcao.guard';
import { DoacaoService } from './doacao.service';
import { CriarDoacaoDTO } from './dto/criar-doacao.dto';

@UseGuards(AuthGuard, FuncaoGuard)
@Controller('/doacoes')
export class DoacaoController {
  constructor(private readonly doacaoService: DoacaoService) {}

  @Funcoes(FuncaoEnum.USUARIO, FuncaoEnum.ADMIN)
  @Post()
  async criar(@Body() data: CriarDoacaoDTO) {
    return this.doacaoService.criar(data);
  }

  @Funcoes(FuncaoEnum.USUARIO, FuncaoEnum.ADMIN)
  @Get('/buscar-item-por-categoria/:categoria')
  buscarPorTipo(@Param('categoria') categoria: string) {
    return this.doacaoService.buscarItensPorCategoria(categoria);
  }
}
