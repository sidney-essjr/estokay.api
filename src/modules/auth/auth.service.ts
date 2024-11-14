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
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { Voluntario } from '../voluntario/entity/voluntario.entity';
import { SessionDataDTO } from './dto/session-data.dto';

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

  validarToken(token: string, issuer: string, audience: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: issuer,
        audience: audience,
      });
      return data;
    } catch (error) {
      throw new BadRequestException('Token inválido.');
    }
  }

  async login(email: string, senha: string, res: Response) {
    const voluntario = await this.voluntarioRepository.findOneBy({ email });

    if (!voluntario || !voluntario.ativo)
      throw new UnauthorizedException('Dados de acesso inválidos.');

    const permitido = await bcrypt.compare(senha, voluntario.senha);

    if (!permitido)
      throw new UnauthorizedException('Dados de acesso inválidos.');

    const token = this.criarToken(voluntario);

    // cria um cookie com o token para gerenciamento de sessão
    this.criarCookie(res, token);
    return res.status(HttpStatus.OK).json();
  }

  async esqueceuSenha(email: string) {
    const voluntario = await this.voluntarioRepository.findOneBy({ email });

    if (!voluntario)
      throw new NotFoundException('Este e-mail não foi reconhecido.');

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
          link: `https://localhost:5173/access/redefinir-senha?token=${token}`, //rota do frontend para redefinição de senha
        },
      });
    } catch (error) {
      throw new BadRequestException(
        'Problemas com o serviço de envio de e-mail.',
        error,
      );
    }
  }

  async redefinirSenha(token: string, novaSenha: string, res: Response) {
    const data = this.validarToken(token, 'esqueceu-senha', 'voluntario');

    novaSenha = await bcrypt.hash(novaSenha, bcrypt.genSaltSync());

    if (data) {
      this.voluntarioRepository.update(data.id, { senha: novaSenha });
    }

    return res.status(HttpStatus.OK).json();
  }

  async sessionLogin(req: any) {
    const id = Number(req.voluntario.id) ?? 0;

    try {
      const voluntario = await this.voluntarioRepository.findOneByOrFail({
        id,
      });

      return plainToInstance(SessionDataDTO, voluntario, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      if (error instanceof Error) throw new NotFoundException(error.message);

      throw new NotFoundException('Dados não localizados.');
    }
  }

  criarCookie(res: Response, token: string) {
    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: 'none',
      domain: 'onrender.com',
      path: '/',
    });
  }
}
