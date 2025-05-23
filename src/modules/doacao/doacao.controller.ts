import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Funcoes } from 'src/common/decorators/funcao.decorator';
import { Voluntario } from 'src/common/decorators/voluntario.decorator';
import { FuncaoEnum } from 'src/common/enums/funcao.enum';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { FuncaoGuard } from 'src/common/guards/funcao.guard';
import { LerVoluntarioDTO } from '../voluntario/dto/ler-voluntario.dto';
import { DoacaoService } from './doacao.service';
import { CriarDoacaoDTO } from './dto/criar-doacao.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('doacoes')
@UseGuards(AuthGuard, FuncaoGuard)
@Controller('/doacoes')
export class DoacaoController {
  constructor(private readonly doacaoService: DoacaoService) {}


  @ApiOperation({ summary: 'Criar doação' })
  @ApiResponse({ status: 201, description: 'Doação criada com sucesso' })
  @Funcoes(FuncaoEnum.USUARIO, FuncaoEnum.ADMIN)
  @Post()
  async criar(
    @Body() data: CriarDoacaoDTO,
    @Voluntario() voluntario: LerVoluntarioDTO,
  ) {
    return this.doacaoService.criar(data, voluntario);
  }

  @ApiOperation({ summary: 'Buscar itens por categoria' })
  @ApiResponse({ status: 200, description: 'Itens encontrados' })
  @ApiResponse({ status: 404, description: 'Itens não encontrados' })
  @Funcoes(FuncaoEnum.USUARIO, FuncaoEnum.ADMIN)
  @Get('/buscar-item-por-categoria/:categoria')
  buscarPorTipo(@Param('categoria') categoria: string) {
    return this.doacaoService.buscarItensPorCategoria(categoria);
  }

  @ApiOperation({ summary: 'Buscar itens por validade' })
  @ApiResponse({ status: 200, description: 'Itens encontrados' })
  @ApiResponse({ status: 404, description: 'Itens não encontrados' })
  @Funcoes(FuncaoEnum.ADMIN)
  @Get('/buscar')
  buscarDoacao(
    @Query('dataInicio') dataInicio: string,
    @Query('dataFim') dataFim: string,
    @Query('voluntario') voluntario: string,
  ) {
    const filtros = {
      dataInicio: dataInicio ? new Date(dataInicio) : undefined,
      dataFim: dataFim ? new Date(dataFim) : undefined,
      voluntario: !Number.isNaN(Number(voluntario)) ? Number(voluntario) : undefined,
    };
    return this.doacaoService.buscarDoacao(filtros);
  }
}
