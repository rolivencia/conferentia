import { IAudit } from './audit.interface';
import { IEvent } from './event.interface';

export interface IActivity extends IAudit {
  id: string;
  title: string;
  event: IEvent;
}
