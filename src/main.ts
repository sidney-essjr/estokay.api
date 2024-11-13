import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: readFileSync('certificates/key.pem'),
    cert: readFileSync('certificates/cert.pem'),
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });

  app.enableCors({
    origin: ['https://localhost:5173', 'https://estokay-front.vercel.app/'],
    credentials: true,
  });

  //configura o uso de pipelines de validação, aplicada com class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
