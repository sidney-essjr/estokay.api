import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Funcoes } from 'src/common/decorators/funcao.decorator';
import { FuncaoEnum } from 'src/common/enums/funcao.enum';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { FuncaoGuard } from 'src/common/guards/funcao.guard';
import { DoadorService } from './doador.service';
import { CriarDoadorDTO } from './dto/criar-doador.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('doadores')
@UseGuards(AuthGuard, FuncaoGuard)
@Controller('doadores')
export class DoadorController {
  constructor(private readonly doadorService: DoadorService) {}

  @ApiOperation({ summary: 'Listar todos os doadores' })
  @ApiResponse({ status: 200, description: 'Listagem de doadores' })
  @Funcoes(FuncaoEnum.USUARIO, FuncaoEnum.ADMIN)
  @Get()
  async lerTodos() {
    return this.doadorService.lerTodos();
  }

  @ApiOperation({ summary: 'Criar um doador' })
  @ApiResponse({ status: 201, description: 'Doador criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro na validação dos dados' })
  @Funcoes(FuncaoEnum.ADMIN)
  @Post()
  async criar(@Body() data: CriarDoadorDTO) {
    return this.doadorService.criar(data);
  }
}
