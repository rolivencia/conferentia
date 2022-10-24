import { IActivity } from './activity.interface';
import { IAudit } from './audit.interface';

export interface IEvent extends IAudit {
  name: string;
  logo: string;
  startDate: string | Date;
  endDate: string | Date;
  activities?: IActivity[];
}
