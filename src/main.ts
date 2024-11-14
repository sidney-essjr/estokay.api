import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';

async function bootstrap() {
  // const httpsOptions = {
  //   key: readFileSync('certificates/key.pem'),
  //   cert: readFileSync('certificates/cert.pem'),
  // };

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['https://estokay.onrender.com', 'https://localhost:5173/'],
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

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
