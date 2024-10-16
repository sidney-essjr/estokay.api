/* eslint-disable @typescript-eslint/no-unused-vars */
import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { Voluntario } from '../voluntario/entity/voluntario.entity';

@Injectable()
export class AuthService {
  private readonly issuer: string = 'login';
  private readonly audience: string = 'voluntario';

  constructor(
    @InjectRepository(Voluntario)
    private readonly voluntarioRepository: Repository<Voluntario>,
    private readonly jwtService: JwtService,
    private readonly mailer: MailerService,
  ) {}

  criarToken(voluntario: Voluntario) {
    return this.jwtService.sign(
      {
        id: voluntario.id,
        nome: voluntario.nome,
        email: voluntario.email,
      },
      {
        expiresIn: '1d',
        issuer: this.issuer,
        audience: this.audience,
      },
    );
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

  async login(email: string, senha: string, res: Response) {
    const voluntario = await this.voluntarioRepository.findOneBy({ email });

    if (!voluntario || !voluntario.ativo)
      throw new UnauthorizedException('Dados de acesso inválidos');

    const permitido = await bcrypt.compare(senha, voluntario.senha);

    if (!permitido)
      throw new UnauthorizedException('Dados de acesso inválidos');

    const token = this.criarToken(voluntario);

    // cria um cookie com o token para gerenciamento de sessão
    this.criarCookie(res, token);

    return res.status(HttpStatus.OK).json();
  }

  async esqueceuSenha(email: string) {
    const voluntario = await this.voluntarioRepository.findOneBy({ email });

    if (!voluntario)
      throw new NotFoundException('Este e-mail não foi reconhecido');

    const token = this.jwtService.sign(
      {
        id: voluntario.id,
        nome: voluntario.nome,
        email: voluntario.email,
      },
      {
        expiresIn: '30 minutes',
        issuer: 'esqueceu-senha',
        audience: 'voluntario',
      },
    );

    try {
      await this.mailer.sendMail({
        subject: 'EstOkay - Esqueceu sua senha?',
        to: `${email}`,
        template: 'esqueceu-senha',
        context: {
          nome: voluntario.nome,
          token: `https://localhost:5173/auth/redefinir-senha?token=${token}`,
        },
      });
    } catch (error) {
      throw new BadRequestException(
        'Problemas com o serviço de envio de e-mail!',
        error,
      );
    }
  }

  async redefinirSenha(token: string) {}

  criarCookie(res: Response, token: string) {
    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    });
  }
}