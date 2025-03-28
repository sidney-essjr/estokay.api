import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Funcoes } from 'src/common/decorators/funcao.decorator';
import { ParamId } from 'src/common/decorators/param-id.decorator';
import { FuncaoEnum } from 'src/common/enums/funcao.enum';
import { QueryFailedExceptionFilter } from 'src/common/filters/query-failed-exception.filter';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { FuncaoGuard } from 'src/common/guards/funcao.guard';
import { AtualizarSenhaDTO } from './dto/atualizar-senha.dto';
import { AtualizarVoluntarioAdmDTO } from './dto/atualizar-voluntario.adm.dto';
import { AtualizarVoluntarioDTO } from './dto/atualizar-voluntario.dto';
import { CriarVoluntarioDTO } from './dto/criar-voluntario.dto';
import { VoluntarioService } from './voluntario.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('voluntarios')
@UseGuards(AuthGuard, FuncaoGuard)
@Controller('voluntarios')
export class VoluntarioController {
  constructor(private readonly voluntarioService: VoluntarioService) {}

  @ApiOperation({ summary: 'Criar um voluntário' })
  @ApiResponse({ status: 201, description: 'Voluntário criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro na validação dos dados' })
  @UseFilters(QueryFailedExceptionFilter)
  @Funcoes(FuncaoEnum.ADMIN)
  @Post()
  async criar(@Body() data: CriarVoluntarioDTO) {
    return this.voluntarioService.criar(data);
  }

  @ApiOperation({ summary: 'Ler um voluntário' })
  @ApiResponse({ status: 200, description: 'Voluntário encontrado' })
  @ApiResponse({ status: 404, description: 'Voluntário não encontrado' })
  @Funcoes(FuncaoEnum.USUARIO, FuncaoEnum.ADMIN)
  @Get(':id')
  async ler(@ParamId() id: number) {
    return this.voluntarioService.ler(id);
  }

  @ApiOperation({ summary: 'Ler um voluntário por email' })
  @ApiResponse({ status: 200, description: 'Voluntário encontrado' })
  @ApiResponse({ status: 404, description: 'Voluntário não encontrado' })
  @Funcoes(FuncaoEnum.USUARIO, FuncaoEnum.ADMIN)
  @Get('buscar/:email')
  async lerPorEmail(@ParamId('email') email: string) {
    return this.voluntarioService.lerPorEmail(email);
  }

  @ApiOperation({ summary: 'Listar todos os voluntários' })
  @ApiResponse({ status: 200, description: 'Listagem de voluntários' })
  @Funcoes(FuncaoEnum.USUARIO, FuncaoEnum.ADMIN)
  @Get()
  async lerTodos() {
    return this.voluntarioService.lerTodos();
  }

  @ApiOperation({ summary: 'Atualizar um voluntário' })
  @ApiResponse({ status: 200, description: 'Voluntário atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro na validação dos dados' })
  @Funcoes(FuncaoEnum.USUARIO, FuncaoEnum.ADMIN)
  @Patch(':id')
  async atualizar(@ParamId() id: number, @Body() data: AtualizarVoluntarioDTO) {
    return this.voluntarioService.atualizar(id, data);
  }

  @ApiOperation({ summary: 'Atualizar a senha de um voluntário' })
  @ApiResponse({ status: 200, description: 'Senha atualizada com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro na validação dos dados' })
  @Funcoes(FuncaoEnum.USUARIO, FuncaoEnum.ADMIN)
  @Patch(':id/senha')
  async atualizarSenha(@ParamId() id: number, @Body() data: AtualizarSenhaDTO) {
    return this.voluntarioService.atualizarSenha(id, data);
  }

  @ApiOperation({ summary: 'Atualizar um voluntário (adm)' })
  @ApiResponse({ status: 200, description: 'Voluntário atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro na validação dos dados' })
  @Funcoes(FuncaoEnum.ADMIN)
  @Patch('adm/:id')
  async atualizarAdm(
    @ParamId() id: number,
    @Body() data: AtualizarVoluntarioAdmDTO,
  ) {
    return this.voluntarioService.atualizarAdm(id, data);
  }
}
