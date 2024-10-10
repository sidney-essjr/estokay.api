/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Voluntario } from '../voluntario/entity/voluntario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly issuer: string = 'login';
  private readonly audience: string = 'voluntario';

  constructor(
    @InjectRepository(Voluntario)
    private readonly voluntarioRepository: Repository<Voluntario>,
    private readonly jwtService: JwtService,
  ) {}

  criarToken(voluntario: Voluntario) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: voluntario.id,
          nome: voluntario.nome,
          email: voluntario.email,
        },
        {
          expiresIn: '3 days',
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
    };
  }

  validarToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.issuer,
        audience: this.audience,
      });
      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  tokenValido(token: string) {
    try {
      this.validarToken(token);
      return true;
    } catch (_error) {
      return false;
    }
  }

  async login(email: string, senha: string) {
    const voluntario = await this.voluntarioRepository.findOneBy({ email });

    if (!voluntario || !voluntario.ativo)
      throw new UnauthorizedException('Dados de acesso inválidos');

    const permitido = await bcrypt.compare(senha, voluntario.senha);

    if (!permitido)
      throw new UnauthorizedException('Dados de acesso inválidos');

    return this.criarToken(voluntario);
  }

  async esqueceuSenha(email: string) {
    if (!this.voluntarioRepository.exists({ where: { email } }))
      throw new NotFoundException('Este e-mail não foi reconhecido');

    //enviar e-mail.
  }

  async resetarSenha(token: string) {}
}
