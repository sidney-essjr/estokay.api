// src/modules/doador/test/doador.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { DoadorController } from '../doador.controller';
import { DoadorService } from '../doador.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { FuncaoGuard } from 'src/common/guards/funcao.guard';
import { FuncaoEnum } from 'src/common/enums/funcao.enum';

describe('DoadorController - criar(dado)', () => {
  let controller: DoadorController;
  const mockDoadorService = {
    criar: jest.fn(),
    lerTodos: jest.fn(),
  };

  const mockGuards = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoadorController],
      providers: [
        {
          provide: DoadorService,
          useValue: mockDoadorService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockGuards)
      .overrideGuard(FuncaoGuard)
      .useValue(mockGuards)
      .compile();

    controller = module.get<DoadorController>(DoadorController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar um novo doador com dados válidos', async () => {
    const doadorData = {
      nome: 'João Silva',
      telefone: '11987654321',
      codigoPostal: '12345678',
      endereco: 'Rua A, 123',
      bairro: 'Centro',
      cidade: 'São Paulo',
      estado: 'SP',
    };

    const doadorCriado = {
      id: 1,
      ...doadorData,
    };

    mockDoadorService.criar.mockResolvedValue(doadorCriado);

    const result = await controller.criar(doadorData);

    expect(result).toEqual(doadorCriado);
    expect(mockDoadorService.criar).toHaveBeenCalledWith(doadorData);
  });

  it.only('deve retornar a lista de doadores', async () => {
    const doadores = [
      {
        id: 1,
        nome: 'Fulano de Tal',
        telefone: '+55 11 99999-9999',
        cidade: 'São Paulo',
      },
    ];

    mockDoadorService.lerTodos.mockResolvedValue(doadores);

    const result = await controller.lerTodos();

    expect(result).toEqual(doadores);
    expect(mockDoadorService.lerTodos).toHaveBeenCalledTimes(1);
  });
});
