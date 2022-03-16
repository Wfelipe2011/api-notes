require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { logger } from 'skyot';
import { AppModule } from './app.module';
import { MongoDBConect } from './database/config/mongoConnect';

export const API_JOB = 'https://stix-job.herokuapp.com';
export const API_NOTES = 'https://stix-notes.herokuapp.com';

async function bootstrap() {
  await MongoDBConect.startMongo();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.listen(process.env.PORT, () => {
    logger(`Servidor rodando na porta: ${process.env.PORT}`);
  });
}
bootstrap();
