import { INotesRepository } from 'src/interface/NotesRepository.interface';
import { NotesBody } from '../dto/notes.dto';
import { IParams } from '../dto/params.dto';

export class GetNotesAnalytics {
  constructor(private repository: INotesRepository) {}

  public async execute(params: IParams) {
    if (!params?.key) return [];

    let notes = [] as NotesBody[];
    notes = await this.repository.find<NotesBody>({ key: params?.key });

    if (params?.clientId)
      notes = await this.repository.find<NotesBody>({
        clientId: params?.clientId,
      });

    if (params?.status) {
      const notesFilter = notes.filter((note) => note.status === params.status);
      notes = notesFilter;
    }

    if (params?.dateFrom && params?.dateTo) {
      const notesFilter = notes.filter((note) => {
        const normalizeDate = note.dateCreated
          ?.toLocaleString('en')
          .split(',')[0]
          .replace(/\//g, '-');
        const from = new Date(params?.dateFrom).getTime();
        const to = new Date(params?.dateTo).getTime();
        const input = new Date(normalizeDate).getTime();
        return Boolean(input >= from && input <= to);
      });
      notes = notesFilter;
    }
    const getTime = (date: Date) => date.getTime();

    const [dateFromCreated] = notes.sort(
      (a, b) => getTime(b?.dateCreated) - getTime(a?.dateCreated),
    );

    const [dateToCreated] = notes.sort(
      (a, b) => getTime(a?.dateCreated) - getTime(b?.dateCreated),
    );

    const totalClients = [];

    notes.forEach((note) => {
      if (!totalClients.includes(note.clientId))
        totalClients.push(note.clientId);
    });

    return {
      totalNotes: notes.length,
      totalClients: totalClients.length,
      statusNotes: {
        analyse: notes.filter((note) => note.status === 'analyse').length,
        process: notes.filter((note) => note.status === 'process').length,
        success: notes.filter((note) => note.status === 'success').length,
        invalid: notes.filter((note) => note.status === 'invalid').length,
        pending: notes.filter((note) => note.status === 'pending').length,
      },
      dateRageNotes: {
        from: dateFromCreated?.dateCreated,
        to: dateToCreated?.dateCreated,
      },
    };
  }
}
