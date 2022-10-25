import { IActivityType } from './activity-type.interface';
import { IAudit } from './audit.interface';
import { IEvent } from './event.interface';
import { ILocation } from './location.interface';
import { IParticipant } from './participant.interface';

export interface IActivity extends IAudit {
  id: string;
  title: string;
  event: IEvent;
  description: string[];
  participants: IParticipant[];
  startDate: Date | string;
  endDate: Date | string;
  type: IActivityType;
  image: string;
  location: ILocation;
}
