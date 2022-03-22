import { HttpException } from '@nestjs/common';
import { logger } from 'skyot';
import { INotesRepository } from 'src/interface/NotesRepository.interface';
import { NotesBody } from './dto/notes.dto';

const listAccept = ['59', '65'];

export class NotesPost {
  constructor(private repository: INotesRepository) {}

  public async execute(body: NotesBody) {
    this.validate(body);
    logger(`${body.key} solicitou um processamento da nota ${body.code}`);
    this.setInitialBodyValues(body);
    await this.save(body);
    return 'Sua nota está sendo processada, consulte o status dentro de alguns minutos';
  }

  private setInitialBodyValues(body: NotesBody) {
    body.dateCreated = new Date();
    body.status = 'analyse';
  }

  private validate(body: NotesBody) {
    if (!body?.code) throw new HttpException('No body', 400);
    const codeModel = `${body.code[20]}${body.code[21]}`;
    if (!listAccept.includes(codeModel))
      throw new HttpException('Não temos suporte para essa nota', 404);
  }

  private async save(body: NotesBody) {
    try {
      await this.repository.save(body);
      logger('salvo com sucesso.');
    } catch (error) {
      logger('Essa nota ja foi processada');
      throw new HttpException('Essa nota já foi processada', 409);
    }
  }
}
