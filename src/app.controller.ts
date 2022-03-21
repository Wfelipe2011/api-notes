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
import { User } from './database/entity/UserEntity';
import { Repository } from './database/repository/Repository';

export interface NotesBody {
  _id?: string;
  code: string;
  email: string;
  dateProcessed?: Date;
  date_created?: string;
  status?: 'analyse' | 'success' | 'process' | 'pending' | 'invalid';
  nota?: any;
}

const listaAceitas = ['59', '65'];

@Controller()
export class AppController {
  repository: Repository;
  constructor(private readonly appService: AppService) {
    this.repository = new Repository(User);
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
    const data = await this.repository.find<NotesBody>({
      code: '35220260479680001252651090001245291300863400',
    });
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

    logger(`${body.email} solicitou um processamento da nota ${body.code}`);
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
    const [created] = new Date()
      .toLocaleString('en', {
        timeZone: 'America/Sao_Paulo',
      })
      .split(',');
    body.date_created = created;
    body.status = 'analyse';
  }
}
