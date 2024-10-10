import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voluntario } from '../voluntario/entity/voluntario.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { VoluntarioModule } from '../voluntario/voluntario.module';

@Module({
  imports: [
    forwardRef(() => VoluntarioModule),
    JwtModule.register({ secret: String(process.env.JWT_SECRET) }),
    TypeOrmModule.forFeature([Voluntario]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
