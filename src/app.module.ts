import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voluntario } from './modules/voluntario/entity/voluntario.entity';
import { ConfigModule } from '@nestjs/config';
import { VoluntarioModule } from './modules/voluntario/voluntario.module';
import { AuthModule } from './modules/auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

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
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 6000, // 6 segundos
          limit: 20, // 20 chamadas
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
