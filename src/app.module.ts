import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voluntario } from './modules/voluntario/entity/voluntario.entity';
import { ConfigModule } from '@nestjs/config';
import { VoluntarioModule } from './modules/voluntario/voluntario.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    VoluntarioModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_SECRET,
      database: process.env.DB_NAME,
      entities: [Voluntario],
      synchronize: process.env.ENV === 'development',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
