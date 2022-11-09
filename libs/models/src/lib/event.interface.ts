import { IAudit } from './audit.interface';
import { ISubjectArea } from './subject-area.interface';

export interface IEvent extends IAudit {
  title: string;
  name: string;
  logo: string;
  startDate: string | Date;
  endDate: string | Date;
  subjectAreas?: ISubjectArea[];
}
