import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { ParamId } from 'src/common/decorators/param-id.decorators';
import { AtualizarSenhaDTO } from './dto/atualizar-senha.dto';
import { AtualizarVoluntarioAdmDTO } from './dto/atualizar-voluntario.adm.dto';
import { AtualizarVoluntarioDTO } from './dto/atualizar-voluntario.dto';
import { CriarVoluntarioDTO } from './dto/criar-voluntario.dto';
import { VoluntarioService } from './voluntario.service';

@Controller('voluntarios')
export class VoluntarioController {
  constructor(private readonly voluntarioService: VoluntarioService) {}

  @Post()
  async criar(@Body() data: CriarVoluntarioDTO) {
    return this.voluntarioService.criar(data);
  }

  @Get(':id')
  async ler(@ParamId() id: number) {
    return this.voluntarioService.ler(id);
  }

  @Get()
  async lerTodos() {
    return this.voluntarioService.lerTodos();
  }

  // voluntario comum
  @Patch(':id')
  async atualizar(@ParamId() id: number, @Body() data: AtualizarVoluntarioDTO) {
    return this.voluntarioService.atualizar(id, data);
  }

  @Patch(':id/senha')
  async atualizarSenha(@ParamId() id: number, @Body() data: AtualizarSenhaDTO) {
    return this.voluntarioService.atualizarSenha(id, data);
  }

  // voluntario adm - possibilita a alteração dos atributos ativo e funcao
  @Patch('adm/:id')
  async atualizarAdm(
    @ParamId() id: number,
    @Body() data: AtualizarVoluntarioAdmDTO,
  ) {
    return this.voluntarioService.atualizarAdm(id, data);
  }
}
