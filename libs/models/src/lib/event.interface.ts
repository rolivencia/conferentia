import { IAudit } from './audit.interface';
import { ISubjectArea } from './subject-area.interface';
import { IEventSponsor } from "./event-sponsor.interface";

export interface IEvent extends IAudit {
  title: string;
  name: string;
  startDate: string | Date;
  endDate: string | Date;
  logo?: string;
  sponsors?: IEventSponsor[];
  subjectAreas?: ISubjectArea[];
}
