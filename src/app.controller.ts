import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Post,
  Query,
} from '@nestjs/common';
import { logger } from 'skyot';
import { AppService } from './app.service';
import { Notes } from './database/entity/NotesEntity';
import { NotesRepository } from './database/repository/notes.repository';
import { NotesBody } from './module/dto/notes.dto';

const listaAceitas = ['59', '65'];

@Controller()
export class AppController {
  repository: NotesRepository;
  constructor(private readonly appService: AppService) {
    this.repository = new NotesRepository(Notes);
  }

  @Get('history')
  async getByEmailNotes(
    @Query()
    params: {
      id: number;
      dateFrom: string;
      dateTo: string;
      email: string;
      status: string;
    },
  ) {
    let notes = [];

    notes = await this.appService.getFindFilter(params, notes);
    return notes;
  }

  @Get('job')
  async startJob() {
    logger('Api esta de pe');
    return 'ok';
  }

  @Delete()
  async delete() {
    const data = await this.repository.find<NotesBody>();
    data.forEach(async (body) => {
      await this.repository.delete(body._id);
    });
  }

  @Post()
  async getHello(
    @Body()
    body: NotesBody,
  ) {
    if (!body?.code) throw new HttpException('No body', 400);

    const codeModel = `${body.code[20]}${body.code[21]}`;
    if (!listaAceitas.includes(codeModel))
      throw new HttpException('Não temos suporte para essa nota', 404);

    logger(`${body.key} solicitou um processamento da nota ${body.code}`);
    this.setInitialBodyValues(body);
    try {
      logger('salvando...');
      await this.repository.save(body);
      logger('salvo com sucesso.');
      return 'Sua nota está sendo processada, consulte o status dentro de alguns minutos';
    } catch (error) {
      logger('Essa nota ja foi processada');
      throw new HttpException('Essa nota já foi processada', 409);
    }
  }

  private setInitialBodyValues(body: NotesBody) {
    body.dateCreated = new Date();
    body.status = 'analyse';
  }
}
