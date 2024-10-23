import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { VoluntarioModule } from '../voluntario/voluntario.module';
import { DoadorController } from './doador.controller';
import { DoadorService } from './doador.service';
import { Doador } from './entity/doador.entity';

@Module({
  imports: [AuthModule, VoluntarioModule, TypeOrmModule.forFeature([Doador])],
  controllers: [DoadorController],
  providers: [DoadorService],
})
export class DoadorModule {}
