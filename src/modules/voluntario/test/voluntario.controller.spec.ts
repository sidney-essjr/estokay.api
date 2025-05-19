import { Test, TestingModule } from '@nestjs/testing';
import { VoluntarioController } from '../voluntario.controller';
import { VoluntarioService } from '../voluntario.service';
import { CriarVoluntarioDTO } from '../dto/criar-voluntario.dto';
import { FuncaoGuard } from 'src/common/guards/funcao.guard';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { QueryFailedExceptionFilter } from 'src/common/filters/query-failed-exception.filter';
import { LerVoluntarioDTO } from '../dto/ler-voluntario.dto';
import { FuncaoEnum } from 'src/common/enums/funcao.enum';
import { AtualizarVoluntarioDTO } from '../dto/atualizar-voluntario.dto';

describe('VoluntarioController', () => {
  let controller: VoluntarioController;
  const mockVoluntarioService = {
    criar: jest.fn(),
    lerTodos: jest.fn(),
    ler: jest.fn(),
    atualizar: jest.fn(),
    lerPorEmail: jest.fn(),
  };

  const mockGuards = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VoluntarioController],
      providers: [
        {
          provide: VoluntarioService,
          useValue: mockVoluntarioService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockGuards)
      .overrideGuard(FuncaoGuard)
      .useValue(mockGuards)
      .overrideFilter(QueryFailedExceptionFilter)
      .useValue({ catch: jest.fn() })
      .compile();

    controller = module.get<VoluntarioController>(VoluntarioController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar um voluntário com dados válidos', async () => {
    const dto: CriarVoluntarioDTO = {
      nome: 'Sidney Souza',
      email: 'sidney@example.com',
      senha: 'SenhaF0rte!',
      telefone: '999999999',
      documento: '123.456.789-09', // use CPF válido se for testar e2e com validação real
    };

    const expectedResponse = {
      id: 1,
      ...dto,
      senha: undefined, // normalmente omitido do retorno real por segurança
    };

    mockVoluntarioService.criar.mockResolvedValue(expectedResponse);

    const result = await controller.criar(dto);

    expect(result).toEqual(expectedResponse);
    expect(mockVoluntarioService.criar).toHaveBeenCalledWith(dto);
  });

  it('deve retornar todos os voluntários', async () => {
    const voluntarios: LerVoluntarioDTO[] = [
      {
        id: 1,
        nome: 'Alice',
        email: 'alice@example.com',
        telefone: '123456789',
        documento: '123.456.789-09',
        ativo: true,
        funcao: FuncaoEnum.USUARIO,
      },
      {
        id: 2,
        nome: 'Bob',
        email: 'bob@example.com',
        telefone: '987654321',
        documento: '987.654.321-00',
        ativo: true,
        funcao: FuncaoEnum.ADMIN,
      },
    ];

    mockVoluntarioService.lerTodos.mockResolvedValue(voluntarios);

    const result = await controller.lerTodos();

    expect(result).toEqual(voluntarios);
    expect(mockVoluntarioService.lerTodos).toHaveBeenCalled();
  });

  it('deve retornar um voluntário por ID', async () => {
    const id = 1;
    const voluntario: LerVoluntarioDTO = {
      id,
      nome: 'Alice',
      email: 'alice@example.com',
      telefone: '123456789',
      documento: '123.456.789-09',
      ativo: true,
      funcao: FuncaoEnum.USUARIO,
    };

    mockVoluntarioService.ler.mockResolvedValue(voluntario);

    const result = await controller.ler(id);

    expect(result).toEqual(voluntario);
    expect(mockVoluntarioService.ler).toHaveBeenCalledWith(id);
  });

  it('deve atualizar um voluntário e retornar o voluntário atualizado', async () => {
    const id = 1;
    const updateData: AtualizarVoluntarioDTO = {
      nome: 'Alice Nova',
      email: 'alice.nova@example.com',
      telefone: '987654321',
      documento: '123.456.789-10',
    };

    const updatedVoluntario = {
      id,
      ...updateData,
    };

    mockVoluntarioService.atualizar.mockResolvedValue(updatedVoluntario);

    const result = await controller.atualizar(id, updateData);

    expect(result).toEqual(updatedVoluntario);
    expect(mockVoluntarioService.atualizar).toHaveBeenCalledWith(
      id,
      updateData,
    );
  });

  it.only('deve retornar um voluntário com base no e-mail fornecido', async () => {
    const email = 'alice.nova@example.com';
    const voluntario = {
      id: 1,
      nome: 'Alice Nova',
      email,
      telefone: '987654321',
      documento: '123.456.789-10',
      funcao: FuncaoEnum.USUARIO,
      ativo: true,
    };

    mockVoluntarioService.lerPorEmail.mockResolvedValue(voluntario);

    const result = await controller.lerPorEmail(email);

    expect(result).toEqual(voluntario);
    expect(mockVoluntarioService.lerPorEmail).toHaveBeenCalledWith(email);
  });
});
