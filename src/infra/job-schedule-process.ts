import {
  API_JOB_FOUR,
  API_JOB_ONE,
  API_JOB_THREE,
  API_JOB_TWO,
  API_NOTES,
} from 'src/main';
import { HttpAdapter } from './Http/http.adapter';
import { Job } from './job.model';
import { JobWork } from './schedule.adapter';

export class JobScheduleProcess extends Job {
  constructor(private readonly httpAdapter: HttpAdapter) {
    super();
  }

  public execute(configCron: string): void {
    JobWork.execute({
      config: configCron,
      start: this.start.bind(this),
    });
  }

  private async start(): Promise<void> {
    this.httpAdapter.get(`${API_JOB_ONE}/notes`);
    setTimeout(() => this.httpAdapter.get(`${API_JOB_TWO}/notes`), 1000);
    setTimeout(() => this.httpAdapter.get(`${API_JOB_THREE}/notes`), 2000);
    setTimeout(() => this.httpAdapter.get(`${API_JOB_FOUR}/notes`), 3000);
    this.httpAdapter.get(`${API_NOTES}/job`);
    this.printDate('start Job Notes');
  }
}
