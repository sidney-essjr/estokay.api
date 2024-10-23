import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { VoluntarioModule } from '../voluntario/voluntario.module';
import { DoacaoController } from './doacao.controller';
import { DoacaoService } from './doacao.service';
import { Doacao } from './entity/doacao.entity';

@Module({
  imports: [AuthModule, VoluntarioModule, TypeOrmModule.forFeature([Doacao])],
  providers: [DoacaoService],
  controllers: [DoacaoController],
  exports: [DoacaoService],
})
export class DoacaoModule {}
