import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstoqueService } from '../estoque/estoque.service';
import { LerVoluntarioDTO } from '../voluntario/dto/ler-voluntario.dto';
import { CriarDistribuicaoDTO } from './dto/criar-distribuicao.dto';
import { Distribuicao } from './entity/distribuicao.entity';
import { ItemDistribuicao } from './entity/item-distribuicao.entity';

@Injectable()
export class DistribuicaoService {
  constructor(
    @InjectRepository(Distribuicao)
    private readonly distribuicaoRepository: Repository<Distribuicao>,
    @InjectRepository(ItemDistribuicao)
    private readonly itemDistribuicaoRepository: Repository<ItemDistribuicao>,
    private readonly estoqueService: EstoqueService,
  ) {}

  async criar(data: CriarDistribuicaoDTO, voluntario: LerVoluntarioDTO) {
    try {
      // Criação e salvamento da distribuição
      const novaDistribuicao = this.distribuicaoRepository.create({
        nomeBeneficiario: data.nome,
        documento: data.documento,
        voluntario,
      });
      const distribuicao =
        await this.distribuicaoRepository.save(novaDistribuicao);

      // Criação dos itens de distribuição
      const itensDistribuicao = await this.criarItensDistribuicao(
        data.itemDistribuicao,
        distribuicao,
      );

      // Salvamento dos itens de distribuição
      await this.itemDistribuicaoRepository.save(itensDistribuicao);
    } catch (error) {
      console.error('Erro ao criar distribuição:', error);
      throw new Error('Erro ao criar distribuição');
    }
  }

  // Método auxiliar para criar itens de distribuição
  private async criarItensDistribuicao(
    itensData: { itemDoacao: number; quantidade: number }[],
    distribuicao: Distribuicao,
  ) {
    return await Promise.all(
      itensData.map(async (item) => {
        const itemEstoque = await this.estoqueService.lerItemDoacao(
          item.itemDoacao,
        );

        await this.estoqueService.atualizarItemDoacao(
          item.itemDoacao,
          itemEstoque.quantidade - item.quantidade,
        );

        return this.itemDistribuicaoRepository.create({
          quantidade: item.quantidade,
          distribuicao,
          itemEstoque,
        });
      }),
    );
  }
}
