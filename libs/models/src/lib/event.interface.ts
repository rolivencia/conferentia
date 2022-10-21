import { IActivity } from './activity.interface';

export interface IEvent {
  id: number;
  name: string;
  activities: IActivity[];
}
