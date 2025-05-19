import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { AtualizarSenhaDTO } from './dto/atualizar-senha.dto';
import { AtualizarVoluntarioAdmDTO } from './dto/atualizar-voluntario.adm.dto';
import { AtualizarVoluntarioDTO } from './dto/atualizar-voluntario.dto';
import { CriarVoluntarioDTO } from './dto/criar-voluntario.dto';
import { LerVoluntarioDTO } from './dto/ler-voluntario.dto';
import { Voluntario } from './entity/voluntario.entity';

@Injectable()
export class VoluntarioService {
  constructor(
    @InjectRepository(Voluntario)
    private readonly voluntarioRepository: Repository<Voluntario>,
  ) {}

  async criar(data: CriarVoluntarioDTO) {
    const senhaHash = await bcrypt.hash(data.senha, bcrypt.genSaltSync());
    data.senha = senhaHash;

    const documentoHash = await bcrypt.hash(
      data.documento,
      bcrypt.genSaltSync(),
    );
    data.documento = documentoHash;

    const novoVoluntario = this.voluntarioRepository.create(data);

    const voluntario = await this.voluntarioRepository.save(novoVoluntario);

    return plainToInstance(LerVoluntarioDTO, voluntario, {
      excludeExtraneousValues: true,
    });
  }

  async ler(id: number) {
    const voluntario = await this.voluntarioRepository.findOneBy({ id });

    return plainToInstance(LerVoluntarioDTO, voluntario, {
      excludeExtraneousValues: true,
    });
  }

  async lerPorEmail(email: string) {
    const voluntario = await this.voluntarioRepository.findOneBy({ email });

    return plainToInstance(LerVoluntarioDTO, voluntario, {
      excludeExtraneousValues: true,
    });
  }

  async lerTodos() {
    const voluntario: Voluntario[] = await this.voluntarioRepository.find();

    return plainToInstance(LerVoluntarioDTO, voluntario, {
      excludeExtraneousValues: true,
    });
  }

  async atualizar(id: number, data: AtualizarVoluntarioDTO) {
    await this.voluntarioRepository.update(id, data);
  }

  async atualizarAdm(id: number, data: AtualizarVoluntarioAdmDTO) {
    await this.voluntarioRepository.update(id, data);
  }

  async atualizarSenha(id: number, data: AtualizarSenhaDTO) {
    const voluntario = await this.voluntarioRepository.findOneBy({ id });

    const permitido = await bcrypt.compare(data.senha, voluntario.senha);

    if (permitido) {
      data.novaSenha = await bcrypt.hash(data.novaSenha, bcrypt.genSaltSync());
      await this.voluntarioRepository.update(id, { senha: data.novaSenha });
    } else {
      throw new ForbiddenException('A senha atual não corresponde');
    }
  }
}
