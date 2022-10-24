import { IAudit } from './audit.interface';
import { IEvent } from '@conferentia/models';

export interface IActivityType extends IAudit {
  name: string;
  color: string;
  backgroundColor: string;
  event?: IEvent;
}
