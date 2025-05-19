// doacao.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';

import { mockDoacaoService } from '../mocks/doacao.service';

import { APP_GUARD } from '@nestjs/core';
import { DoacaoController } from '../doacao.controller';
import { DoacaoService } from '../doacao.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { mockAuthGuard, mockFuncaoGuard } from '../mocks/guards';
import { FuncaoGuard } from 'src/common/guards/funcao.guard';
import { FuncaoEnum } from 'src/common/enums/funcao.enum';

describe('DoacaoController', () => {
  let controller: DoacaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoacaoController],
      providers: [
        {
          provide: DoacaoService,
          useValue: mockDoacaoService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .overrideGuard(FuncaoGuard)
      .useValue(mockFuncaoGuard)
      .compile();

    controller = module.get<DoacaoController>(DoacaoController);
  });

  it('deve criar uma doação com sucesso', async () => {
    const data = {
      doador: 1,
      dataEntrada: new Date('2025-05-10'),
      itens: [
        {
          descricao: 'Arroz 5kg',
          quantidade: 2,
          categoria: 'Alimentos',
          tamanho: '5kg',
          medida: 'kg',
          validade: new Date('2025-12-31'),
        },
        {
          descricao: 'Feijão 1kg',
          quantidade: 3,
          categoria: 'Alimentos',
          tamanho: '1kg',
          medida: 'kg',
          validade: new Date('2025-11-30'),
        },
      ],
    };

    const voluntario = {
      id: 42,
      nome: 'Maria Silva',
      email: 'maria@exemplo.com',
      telefone: '11999999999',
      documento: '12345678900',
      ativo: true,
      funcao: FuncaoEnum.USUARIO,
    };

    const expectedResult = {
      id: 'doacao-xyz',
      ...data,
      voluntario,
    };

    mockDoacaoService.criar.mockResolvedValue(expectedResult);

    const result = await controller.criar(data, voluntario);

    expect(result).toEqual(expectedResult);
    expect(mockDoacaoService.criar).toHaveBeenCalledWith(data, voluntario);
  });
});
 