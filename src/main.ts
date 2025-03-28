import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { readFileSync } from 'fs';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const httpsOptions = {
    key: readFileSync('certificates/key.pem'),
    cert: readFileSync('certificates/cert.pem'),
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });

  const config = new DocumentBuilder()
  .setTitle('EstoKay API')
  .setDescription('API para controle de estoque de doações')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: [
      'https://estokay.onrender.com',
      'https://localhost:5173',
      'https://estokay-front.vercel.app',
    ],
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
