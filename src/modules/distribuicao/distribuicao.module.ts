import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { EstoqueModule } from '../estoque/estoque.module';
import { VoluntarioModule } from '../voluntario/voluntario.module';
import { DistribuicaoController } from './distribuicao.controller';
import { DistribuicaoService } from './distribuicao.service';
import { Distribuicao } from './entity/distribuicao.entity';
import { ItemDistribuicao } from './entity/item-distribuicao.entity';

@Module({
  imports: [
    AuthModule,
    VoluntarioModule,
    EstoqueModule,
    TypeOrmModule.forFeature([Distribuicao, ItemDistribuicao]),
  ],
  controllers: [DistribuicaoController],
  providers: [DistribuicaoService],
})
export class DistribuicaoModule {}
