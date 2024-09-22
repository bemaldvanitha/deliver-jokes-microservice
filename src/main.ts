import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

import { AppModule } from './app.module';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config = new DocumentBuilder().setTitle('Deliver Jokes API')
    .setDescription('API documentation for the deliver Jokes microservice').setVersion('1.0')
    .addTag('jokes').build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 4001;
  await app.listen(port, () => {
    console.log(`Application is running on: http://localhost:${port}`);
  });
}
bootstrap();