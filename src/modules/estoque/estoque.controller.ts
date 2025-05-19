import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Funcoes } from 'src/common/decorators/funcao.decorator';
import { FuncaoEnum } from 'src/common/enums/funcao.enum';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { FuncaoGuard } from 'src/common/guards/funcao.guard';
import { AdicionarDTO } from './dto/adicionar.dto';
import { EstoqueService } from './estoque.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('estoque')
@UseGuards(AuthGuard, FuncaoGuard)
@Controller('/estoque')
export class EstoqueController {
  constructor(private readonly estoqueService: EstoqueService) {}

  @ApiOperation({ summary: 'Adicionar item ao estoque' })
  @ApiResponse({ status: 201, description: 'Item adicionado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro na validação dos dados' })
  @Funcoes(FuncaoEnum.USUARIO, FuncaoEnum.ADMIN)
  @Get('/buscar')
  buscarItens(
    @Query('categoria') categoria?: string,
    @Query('descricao') descricao?: string,
    @Query('tamanho') tamanho?: string,
    @Query('validade') validadeAte?: string,
  ) {
    const filtros = {
      categoria,
      descricao,
      tamanho,
      validadeAte: validadeAte ? new Date(validadeAte) : undefined,
    };
    return this.estoqueService.buscarItens(filtros);
  }

  @ApiOperation({ summary: 'Adicionar item ao estoque' })
  @ApiResponse({ status: 201, description: 'Item adicionado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro na validação dos dados' })
  @Funcoes(FuncaoEnum.ADMIN)
  @Patch('/atualizar/:id')
  atualizar(@Body() item: AdicionarDTO, @Param() id: number) {
    this.estoqueService.atualizarItemDoacao(id, item);
  }
}
