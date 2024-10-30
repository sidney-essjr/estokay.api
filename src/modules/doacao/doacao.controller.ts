import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Funcoes } from 'src/common/decorators/funcao.decorator';
import { Voluntario } from 'src/common/decorators/voluntario.decorator';
import { FuncaoEnum } from 'src/common/enums/funcao.enum';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { FuncaoGuard } from 'src/common/guards/funcao.guard';
import { LerVoluntarioDTO } from '../voluntario/dto/ler-voluntario.dto';
import { DoacaoService } from './doacao.service';
import { CriarDoacaoDTO } from './dto/criar-doacao.dto';

@UseGuards(AuthGuard, FuncaoGuard)
@Controller('/doacoes')
export class DoacaoController {
  constructor(private readonly doacaoService: DoacaoService) {}

  @Funcoes(FuncaoEnum.USUARIO, FuncaoEnum.ADMIN)
  @Post()
  async criar(
    @Body() data: CriarDoacaoDTO,
    @Voluntario() voluntario: LerVoluntarioDTO,
  ) {
    return this.doacaoService.criar(data, voluntario);
  }

  @Funcoes(FuncaoEnum.USUARIO, FuncaoEnum.ADMIN)
  @Get('/buscar-item-por-categoria/:categoria')
  buscarPorTipo(@Param('categoria') categoria: string) {
    return this.doacaoService.buscarItensPorCategoria(categoria);
  }
}