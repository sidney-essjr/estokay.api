import { Body, Controller, Post } from '@nestjs/common';
import { Voluntario } from 'src/common/decorators/voluntario.decorator';
import { LerVoluntarioDTO } from '../voluntario/dto/ler-voluntario.dto';
import { DistribuicaoService } from './distribuicao.service';
import { CriarDistribuicaoDTO } from './dto/criar-distribuicao.dto';

@Controller('distribuicoes')
export class DistribuicaoController {
  constructor(private readonly distribuicaoService: DistribuicaoService) {}

  @Post()
  criar(
    @Body() data: CriarDistribuicaoDTO,
    @Voluntario() voluntario: LerVoluntarioDTO,
  ) {
    return this.distribuicaoService.criar(data, voluntario);
  }
}
