import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CriarDoacaoDTO } from './dto/criar-doacao.dto';
import { Doacao } from './entity/doacao.entity';

@Injectable()
export class DoacaoService {
  constructor(
    @InjectRepository(Doacao)
    private readonly doacaoRepository: Repository<Doacao>,
  ) {}

  async criar(data: CriarDoacaoDTO) {
    const doacaoData: DeepPartial<Doacao> = {
      ...data,
      doador: { id: data.doador },
    };
    const novaDoacao = this.doacaoRepository.create(doacaoData);
    return await this.doacaoRepository.save(novaDoacao);
  }
}
