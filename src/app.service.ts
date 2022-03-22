import { Injectable } from '@nestjs/common';
import { Notes } from './database/entity/NotesEntity';
import { NotesRepository } from './database/repository/notes.repository';
import { AxiosAdapter } from './infra/Http/axios.adapter';
import { JobSchedulePending } from './infra/job-schedule-pending';
import { JobScheduleProcess } from './infra/job-schedule-process';
import { INotesRepository } from './interface/NotesRepository.interface';
import { NotesBody } from './module/dto/notes.dto';
@Injectable()
export class AppService {
  jobSchedulePending: JobSchedulePending;
  jobScheduleProcess: JobScheduleProcess;
  repository: INotesRepository;
  constructor() {
    this.jobSchedulePending = new JobSchedulePending(new AxiosAdapter());
    this.jobScheduleProcess = new JobScheduleProcess(new AxiosAdapter());
    this.repository = new NotesRepository(Notes);

    // this.startJob();
  }

  startJob() {
    this.jobSchedulePending.execute('0 0 * * *');
    this.jobScheduleProcess.execute('*/4 * * * *');
  }

  async getFindFilter(
    params: {
      id: number;
      dateFrom: string;
      dateTo: string;
      email: string;
      status: string;
    },
    notes: NotesBody[],
  ) {
    if (!params?.email && !params?.id)
      notes = await this.repository.find<NotesBody>();
    if (params?.email)
      notes = await this.repository.find<NotesBody>({ email: params?.email });
    if (params?.id && !notes.length)
      notes = await this.repository.find<NotesBody>({ id: params?.id });

    if (params?.status) {
      const notesFilter = notes.filter((note) => note.status === params.status);
      notes = notesFilter;
    }

    if (params?.dateFrom && params?.dateTo) {
      const notesFilter = notes.filter((note) => {
        const from = new Date(params?.dateFrom).getTime();
        const to = new Date(params?.dateTo).getTime();
        const input = note.dateCreated.getTime();
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
