import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doador } from './entity/doador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Doador])],
  providers: [],
  controllers: [],
})
export class DoadorModule {}
