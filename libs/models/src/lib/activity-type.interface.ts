import { IAudit } from './audit.interface';
import { IEvent } from '@conferentia/models';

export interface IActivityType extends IAudit {
  name: string;
  fontColor: string;
  backgroundColor: string;
  event?: IEvent;
  image: string;
}
