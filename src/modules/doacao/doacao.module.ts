import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { VoluntarioModule } from '../voluntario/voluntario.module';
import { DoacaoController } from './doacao.controller';
import { DoacaoService } from './doacao.service';
import { Doacao } from './entity/doacao.entity';
import { ItemDoacao } from './entity/item-doacao.entity';
import { EstoqueModule } from '../estoque/estoque.module';

@Module({
  imports: [
    AuthModule,
    VoluntarioModule,
    EstoqueModule,
    TypeOrmModule.forFeature([Doacao, ItemDoacao]),
  ],
  providers: [DoacaoService],
  controllers: [DoacaoController],
  exports: [DoacaoService],
})
export class DoacaoModule {}
