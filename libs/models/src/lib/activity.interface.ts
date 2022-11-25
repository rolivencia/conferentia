import { IActivityType } from './activity-type.interface';
import { IAudit } from './audit.interface';
import { IEvent } from './event.interface';
import { ILocation } from './location.interface';
import { IParticipant } from './participant.interface';

export type Schedule = { day: string; activities: IActivity[] }[];

export interface IActivity extends IAudit {
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
