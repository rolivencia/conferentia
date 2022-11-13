import { IAudit } from './audit.interface';
import { ISubjectArea } from './subject-area.interface';
import { IEventSponsor } from './event-sponsor.interface';
import { IImage } from './image.interface';

export interface IEvent extends IAudit {
  title: string;
  name: string;
  startDate: string | Date;
  endDate: string | Date;
  featuredImage?: IImage;
  logo?: string;
  sponsors?: IEventSponsor[];
  subjectAreas?: ISubjectArea[];
}
