import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voluntario } from './entity/voluntario.entity';
import { VoluntarioController } from './voluntario.controller';
import { VoluntarioService } from './voluntario.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Voluntario]),
  ],
  controllers: [VoluntarioController],
  providers: [VoluntarioService],
  exports: [VoluntarioService],
})
export class VoluntarioModule {}
