import {
  API_JOB_FOUR,
  API_JOB_ONE,
  API_JOB_THREE,
  API_JOB_TWO,
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
    this.printDate('Job ONE Notes');
    setTimeout(() => {
      this.httpAdapter.get(`${API_JOB_TWO}/notes`);
      this.printDate('Job TWO Notes');
    }, 1000 * 60);
    setTimeout(() => {
      this.httpAdapter.get(`${API_JOB_THREE}/notes`);
      this.printDate('Job THREE Notes');
    }, 2000 * 60);
    setTimeout(() => {
      this.httpAdapter.get(`${API_JOB_FOUR}/notes`);
      this.printDate('Job FOUR Notes');
    }, 3000 * 60);
    // this.httpAdapter.get(`${API_NOTES}/job`);
  }
}
