import { IActivity } from './activity.interface';

export interface IEvent {
  id: string;
  name: string;
  logo: string;
  startDate: string | Date;
  endDate: string | Date;
  activities?: IActivity[];
}
