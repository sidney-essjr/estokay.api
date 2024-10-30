import { Body, Controller, Post } from '@nestjs/common';
import { DistribuicaoService } from './distribuicao.service';
import { CriarDistribuicaoDTO } from './dto/criar-distribuicao.dto';

@Controller('distribuicoes')
export class DistribuicaoController {
  constructor(private readonly distribuicaoService: DistribuicaoService) {}

  @Post()
  criar(@Body() data: CriarDistribuicaoDTO) {
    return this.distribuicaoService.criar(data);
  }
}
