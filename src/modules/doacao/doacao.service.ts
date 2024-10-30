import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { EstoqueService } from '../estoque/estoque.service';
import { CriarDoacaoDTO } from './dto/criar-doacao.dto';
import { Doacao } from './entity/doacao.entity';
import { ItemDoacao } from './entity/item-doacao.entity';
import { LerVoluntarioDTO } from '../voluntario/dto/ler-voluntario.dto';

@Injectable()
export class DoacaoService {
  constructor(
    @InjectRepository(Doacao)
    private readonly doacaoRepository: Repository<Doacao>,
    @InjectRepository(ItemDoacao)
    private readonly itemDoacaoRepository: Repository<ItemDoacao>,
    private readonly estoqueService: EstoqueService,
  ) {}

  async criar(data: CriarDoacaoDTO, voluntario: LerVoluntarioDTO) {
    const doacaoData: DeepPartial<Doacao> = {
      ...data,
      doador: { id: data.doador },
      voluntario,
    };

    data.itens.map((item) => {
      this.estoqueService.adicionarItem({
        categoria: item.categoria,
        descricao: item.descricao,
        medida: item.medida,
        quantidade: item.quantidade,
        tamanho: item.tamanho,
        validade: item.validade,
      });
    });

    const novaDoacao = this.doacaoRepository.create(doacaoData);
    return await this.doacaoRepository.save(novaDoacao);
  }

  async lerItemDoacao(id: number) {
    return this.itemDoacaoRepository.findOneBy({ id });
  }

  async buscarItensPorCategoria(categoria: string) {
    return this.itemDoacaoRepository.findBy({ categoria });
  }

  async atualizarItemDoacao(id: number, quantidade: number) {
    this.itemDoacaoRepository.update(id, { quantidade });
  }
}
