import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdicionarDTO } from './dto/adicionar.dto';
import { Estoque } from './entity/estoque.entity';

@Injectable()
export class EstoqueService {
  constructor(
    @InjectRepository(Estoque)
    private readonly estoqueRepository: Repository<Estoque>,
  ) {}

  async adicionarItem(data: AdicionarDTO) {
    const novoItem = this.estoqueRepository.create(data);
    return this.estoqueRepository.save(novoItem);
  }

  async removerItem(entidade: Estoque) {
    return this.estoqueRepository.remove(entidade);
  }

  async buscarItens(filtros: {
    categoria?: string;
    descricao?: string;
    tamanho?: string;
    validadeAte?: Date;
  }) {
    const queryBuilder = this.estoqueRepository.createQueryBuilder('item');

    if (filtros.categoria) {
      queryBuilder.andWhere('item.categoria = :categoria', {
        categoria: filtros.categoria,
      });
    }

    if (filtros.descricao) {
      queryBuilder.andWhere('item.descricao ILIKE :descricao', {
        descricao: `%${filtros.descricao}%`,
      });
    }

    if (filtros.tamanho) {
      queryBuilder.andWhere('item.tamanho = :tamanho', {
        tamanho: filtros.tamanho,
      });
    }

    if (filtros.validadeAte) {
      queryBuilder.andWhere('item.validade < :validadeAte', {
        validadeAte: filtros.validadeAte,
      });
    }
    const result = await queryBuilder.getMany();

    return result;
  }

  async lerItemDoacao(id: number) {
    return this.estoqueRepository.findOneBy({ id });
  }

  async atualizarQuantidadeItemDoacao(id: number, quantidade: number) {
    this.estoqueRepository.update(id, { quantidade });
  }

  async atualizarItemDoacao(id: number, item: AdicionarDTO) {
    this.estoqueRepository.update(id, item);
  }
}
