require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { logger } from 'skyot';
import { AppModule } from './app.module';
import { MongoDBConect } from './database/config/mongoConnect';

export const API_JOB_ONE = 'https://notas-job1.herokuapp.com';
export const API_JOB_TWO = 'https://notas-job2.herokuapp.com';
export const API_JOB_THREE = 'https://notas-job3.herokuapp.com';
export const API_JOB_FOUR = 'https://notas-job4.herokuapp.com';
export const API_NOTES = 'https://stix-notes.herokuapp.com';

async function bootstrap() {
  await MongoDBConect.startMongo();
  const app = await NestFactory.create(AppModule);
  startSwagger(app);
  app.enableCors();
  app.listen(process.env.PORT, () => {
    logger(`Servidor rodando na porta: ${process.env.PORT}`);
  });
}
bootstrap();

function startSwagger(app) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Skyot Notas')
    .setDescription('Documentação de API criada com Swagger')
    .setVersion('1.0')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument);
}
