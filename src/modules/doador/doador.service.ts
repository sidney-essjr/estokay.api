import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doador } from './entity/doador.entity';

@Injectable()
export class DoadorService {
  constructor(
    @InjectRepository(Doador)
    private readonly doadorRepository: Repository<Doador>,
  ) {}

  async lerTodos() {
    return await this.doadorRepository.find();
  }
}
