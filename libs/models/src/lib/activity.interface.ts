import { IEvent } from './event.interface';

export interface IActivity {
  id: string;
  title: string;
  event: IEvent;
}
