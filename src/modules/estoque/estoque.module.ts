import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { VoluntarioModule } from '../voluntario/voluntario.module';
import { Estoque } from './entity/estoque.entity';
import { EstoqueController } from './estoque.controller';
import { EstoqueService } from './estoque.service';

@Module({
  imports: [AuthModule, VoluntarioModule, TypeOrmModule.forFeature([Estoque])],
  providers: [EstoqueService],
  controllers: [EstoqueController],
  exports: [EstoqueService],
})
export class EstoqueModule {}
