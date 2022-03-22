import { INotesRepository } from 'src/interface/NotesRepository.interface';
import { NotesBody } from '../dto/notes.dto';
import { IParams } from '../dto/params.dto';

export class GetNotes {
  constructor(private repository: INotesRepository) {}

  public async execute(params: IParams) {
    let notes = [] as NotesBody[];

    if (!params?.key || !params?.clientId) return [];
    if (params?.key)
      notes = await this.repository.find<NotesBody>({ key: params?.key });
    if (params?.clientId && !notes.length)
      notes = await this.repository.find<NotesBody>({
        clientId: params?.clientId,
      });

    if (params?.status) {
      const notesFilter = notes.filter((note) => note.status === params.status);
      notes = notesFilter;
    }

    if (params?.dateFrom && params?.dateTo) {
      const notesFilter = notes.filter((note) => {
        const from = new Date(params?.dateFrom).getTime();
        const to = new Date(params?.dateTo).getTime();
        const input = note?.dateCreated?.getTime();
        return Boolean(input >= from && input <= to);
      });
      notes = notesFilter;
    }
    const getTime = (date: Date) => date.getTime();

    return notes.sort(
      (a, b) => getTime(b.dateCreated) - getTime(a.dateCreated),
    );
  }
}
