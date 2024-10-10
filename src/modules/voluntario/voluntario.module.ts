import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voluntario } from './entity/voluntario.entity';
import { VoluntarioController } from './voluntario.controller';
import { VoluntarioService } from './voluntario.service';

@Module({
  imports: [TypeOrmModule.forFeature([Voluntario])],
  controllers: [VoluntarioController],
  providers: [VoluntarioService],
})
export class VoluntarioModule {}
