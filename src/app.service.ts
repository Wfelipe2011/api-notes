import { Injectable } from '@nestjs/common';
import { AxiosAdapter } from './infra/Http/axios.adapter';
import { JobSchedulePending } from './infra/job-schedule-pending';
import { JobScheduleProcess } from './infra/job-schedule-process';

@Injectable()
export class AppService {
  jobSchedulePending: JobSchedulePending;
  jobScheduleProcess: JobScheduleProcess;
  constructor() {
    this.jobSchedulePending = new JobSchedulePending(new AxiosAdapter());
    this.jobScheduleProcess = new JobScheduleProcess(new AxiosAdapter());

    this.startJob();
  }

  startJob() {
    this.jobSchedulePending.execute('35 9 * * *');
    this.jobScheduleProcess.execute('*/10 * * * *');
  }
}
