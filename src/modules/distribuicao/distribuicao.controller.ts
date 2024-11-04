import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { Funcoes } from 'src/common/decorators/funcao.decorator';
import { Voluntario } from 'src/common/decorators/voluntario.decorator';
import { FuncaoEnum } from 'src/common/enums/funcao.enum';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { FuncaoGuard } from 'src/common/guards/funcao.guard';
import { LerVoluntarioDTO } from '../voluntario/dto/ler-voluntario.dto';
import { DistribuicaoService } from './distribuicao.service';
import { CriarDistribuicaoDTO } from './dto/criar-distribuicao.dto';

@UseGuards(AuthGuard, FuncaoGuard)
@Controller('distribuicoes')
export class DistribuicaoController {
  constructor(private readonly distribuicaoService: DistribuicaoService) {}

  @Funcoes(FuncaoEnum.USUARIO, FuncaoEnum.ADMIN)
  @Post()
  criar(
    @Body() data: CriarDistribuicaoDTO,
    @Voluntario() voluntario: LerVoluntarioDTO,
  ) {
    return this.distribuicaoService.criar(data, voluntario);
  }

  @Funcoes(FuncaoEnum.ADMIN)
  @Get('/buscar')
  buscarDistribuicao(
    @Query('dataInicio') dataInicio?: string,
    @Query('dataFim') dataFim?: string,
    @Query('voluntario') voluntario?: string,
  ) {
    const filtros = {
      dataInicio: dataInicio ? new Date(dataInicio) : undefined,
      dataFim: dataFim ? new Date(dataFim) : undefined,
      voluntario: !isNaN(Number(voluntario)) ? Number(voluntario) : undefined,
    };

    return this.distribuicaoService.buscarDistribuicao(filtros);
  }
}
