// src/modules/estoque/test/estoque.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { EstoqueController } from '../estoque.controller';
import { EstoqueService } from '../estoque.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { FuncaoGuard } from 'src/common/guards/funcao.guard';
import { FuncaoEnum } from 'src/common/enums/funcao.enum';
import { AdicionarDTO } from '../dto/adicionar.dto';

describe('EstoqueController - buscarItens', () => {
  let controller: EstoqueController;
  const mockEstoqueService = {
    buscarItens: jest.fn(),
    atualizarItemDoacao: jest.fn(),
  };

  const mockGuards = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstoqueController],
      providers: [
        {
          provide: EstoqueService,
          useValue: mockEstoqueService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockGuards)
      .overrideGuard(FuncaoGuard)
      .useValue(mockGuards)
      .compile();

    controller = module.get<EstoqueController>(EstoqueController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar itens filtrados corretamente', async () => {
    const filtros = {
      categoria: 'Categoria Teste',
      descricao: 'Item Teste',
      tamanho: 'M',
      validadeAte: '2025-12-31T00:00:00.000Z',
    };

    const itens = [
      {
        id: 1,
        descricao: 'Item Teste',
        quantidade: 10,
        categoria: 'Categoria Teste',
        tamanho: 'M',
        validade: new Date('2025-12-31T00:00:00.000Z'),
      },
    ];

    mockEstoqueService.buscarItens.mockResolvedValue(itens);

    const result = await controller.buscarItens(
      filtros.categoria,
      filtros.descricao,
      filtros.tamanho,
      filtros.validadeAte,
    );

    expect(result).toEqual(itens);

    expect(mockEstoqueService.buscarItens).toHaveBeenCalledWith({
      categoria: 'Categoria Teste',
      descricao: 'Item Teste',
      tamanho: 'M',
      validadeAte: new Date('2025-12-31T00:00:00.000Z'),
    });
  });

  it('deve retornar itens sem filtros', async () => {
    const filtros = {};
    const itens = [
      {
        id: 1,
        descricao: 'Item Teste',
        quantidade: 10,
        categoria: 'Categoria Teste',
        tamanho: 'M',
        validade: '2025-12-31T00:00:00.000Z',
      },
    ];

    mockEstoqueService.buscarItens.mockResolvedValue(itens);

    const result = await controller.buscarItens();

    expect(result).toEqual(itens);
    expect(mockEstoqueService.buscarItens).toHaveBeenCalledWith(filtros);
  });

  it.only('deve chamar estoqueService.atualizarItemDoacao com os parâmetros corretos', async () => {
    const id = 1;

    const dto: AdicionarDTO = {
      descricao: 'Item Atualizado',
      quantidade: 5,
      categoria: 'Alimentos',
      tamanho: 'M',
      medida: 'kg',
      validade: new Date('2025-12-31'),
    };

    const atualizarMock = jest
      .spyOn(mockEstoqueService, 'atualizarItemDoacao')
      .mockResolvedValue(undefined);

    await controller.atualizar(dto, id);

    expect(atualizarMock).toHaveBeenCalledWith(id, dto);
  });
});
