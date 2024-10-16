import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voluntario } from './modules/voluntario/entity/voluntario.entity';
import { ConfigModule } from '@nestjs/config';
import { VoluntarioModule } from './modules/voluntario/voluntario.module';
import { AuthModule } from './modules/auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

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
    MailerModule.forRoot({
      transport: {
        host: 'smtpout.secureserver.net',
        port: 465,
        secure: true,
        auth: {
          user: String(process.env.EMAIL_USER),
          pass: String(process.env.EMAIL_SECRET),
        },
      },
      defaults: {
        from: '"EstOkay" <sidney@sessjr.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*'); //aplica o middleware a todas as rotas
  }
}
