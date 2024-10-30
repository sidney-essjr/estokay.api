import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Funcoes } from 'src/common/decorators/funcao.decorator';
import { FuncaoEnum } from 'src/common/enums/funcao.enum';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { FuncaoGuard } from 'src/common/guards/funcao.guard';
import { EstoqueService } from './estoque.service';

@UseGuards(AuthGuard, FuncaoGuard)
@Controller('/estoque')
export class EstoqueController {
  constructor(private readonly estoqueService: EstoqueService) {}

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
}
