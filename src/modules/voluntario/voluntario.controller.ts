import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { ParamId } from 'src/common/decorators/param-id.decorators';
import { AtualizarSenhaDTO } from './dto/atualizar-senha.dto';
import { AtualizarVoluntarioAdmDTO } from './dto/atualizar-voluntario.adm.dto';
import { AtualizarVoluntarioDTO } from './dto/atualizar-voluntario.dto';
import { CriarVoluntarioDTO } from './dto/criar-voluntario.dto';
import { VoluntarioService } from './voluntario.service';
import { FuncaoGuard } from 'src/common/guards/funcao.guard';
import { Funcoes } from 'src/common/decorators/funcao.decator';
import { FuncaoEnum } from 'src/common/enums/funcao.enum';
import { AuthGuard } from 'src/common/guards/auth.guard';

@UseGuards(AuthGuard, FuncaoGuard)
@Controller('voluntarios')
export class VoluntarioController {
  constructor(private readonly voluntarioService: VoluntarioService) {}

  @Funcoes(FuncaoEnum.ADMIN)
  @Post()
  async criar(@Body() data: CriarVoluntarioDTO) {
    return this.voluntarioService.criar(data);
  }

  @Funcoes(FuncaoEnum.USUARIO, FuncaoEnum.ADMIN)
  @Get(':id')
  async ler(@ParamId() id: number) {
    return this.voluntarioService.ler(id);
  }

  @Funcoes(FuncaoEnum.USUARIO, FuncaoEnum.ADMIN)
  @Get()
  async lerTodos() {
    return this.voluntarioService.lerTodos();
  }

  @Funcoes(FuncaoEnum.USUARIO, FuncaoEnum.ADMIN)
  @Patch(':id')
  async atualizar(@ParamId() id: number, @Body() data: AtualizarVoluntarioDTO) {
    return this.voluntarioService.atualizar(id, data);
  }

  @Funcoes(FuncaoEnum.USUARIO, FuncaoEnum.ADMIN)
  @Patch(':id/senha')
  async atualizarSenha(@ParamId() id: number, @Body() data: AtualizarSenhaDTO) {
    return this.voluntarioService.atualizarSenha(id, data);
  }

  @Funcoes(FuncaoEnum.ADMIN)
  @Patch('adm/:id')
  async atualizarAdm(
    @ParamId() id: number,
    @Body() data: AtualizarVoluntarioAdmDTO,
  ) {
    return this.voluntarioService.atualizarAdm(id, data);
  }
}
