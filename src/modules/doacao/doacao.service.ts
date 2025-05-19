import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { EstoqueService } from '../estoque/estoque.service';
import { LerVoluntarioDTO } from '../voluntario/dto/ler-voluntario.dto';
import { CriarDoacaoDTO } from './dto/criar-doacao.dto';
import { Doacao } from './entity/doacao.entity';
import { ItemDoacao } from './entity/item-doacao.entity';

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

    data.itens.forEach((item) => {
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

  async buscarDoacao(filtros: {
    dataInicio?: Date;
    dataFim?: Date;
    voluntario?: number;
  }) {
    const queryBuilder = this.doacaoRepository
      .createQueryBuilder('doacao')
      .leftJoinAndSelect('doacao.doador', 'doador')
      .leftJoinAndSelect('doacao.itens', 'item')
      .leftJoinAndSelect('doacao.voluntario', 'voluntario')
      .select([
        'doacao.id',
        'doacao.dataEntrada',
        'doador.nome',
        'doador.cidade',
        'doador.estado',
        'item.quantidade',
        'item.categoria',
        'item.descricao',
        'item.medida',
        'item.tamanho',
        'voluntario.nome',
      ]);

    if (filtros.dataInicio) {
      queryBuilder.andWhere('doacao.dataEntrada >= :dataInicio', {
        dataInicio: filtros.dataInicio,
      });
    }

    if (filtros.dataFim) {
      queryBuilder.andWhere('doacao.dataEntrada <= :dataFim', {
        dataFim: filtros.dataFim,
      });
    }

    if (filtros.voluntario) {
      queryBuilder.andWhere('voluntario.id = :voluntario', {
        voluntario: filtros.voluntario,
      });
    }

    const result = await queryBuilder.getMany();
    return result;
  }

  async atualizarItemDoacao(id: number, quantidade: number) {
    this.itemDoacaoRepository.update(id, { quantidade });
  }
}
