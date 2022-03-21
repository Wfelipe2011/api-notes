import { Injectable } from '@nestjs/common';
import { NotesBody } from './app.controller';
import { User } from './database/entity/UserEntity';
import { Repository } from './database/repository/Repository';
import { AxiosAdapter } from './infra/Http/axios.adapter';
import { JobSchedulePending } from './infra/job-schedule-pending';
import { JobScheduleProcess } from './infra/job-schedule-process';

@Injectable()
export class AppService {
  jobSchedulePending: JobSchedulePending;
  jobScheduleProcess: JobScheduleProcess;
  repository: Repository;
  constructor() {
    this.jobSchedulePending = new JobSchedulePending(new AxiosAdapter());
    this.jobScheduleProcess = new JobScheduleProcess(new AxiosAdapter());
    this.repository = new Repository(User);

    this.startJob();
  }

  startJob() {
    this.jobSchedulePending.execute('35 9 * * *');
    this.jobScheduleProcess.execute('*/10 * * * *');
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
        const input = new Date(note.date_created).getTime();
        return Boolean(input >= from && input <= to);
      });
      notes = notesFilter;
    }
    const getTime = (date: string) => new Date(date).getTime();

    return notes.sort(
      (a, b) => getTime(b.date_created) - getTime(a.date_created),
    );
  }
}
