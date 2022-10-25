import { IEvent } from '@conferentia/models';
import { IAudit } from './audit.interface';
import { IAttendee } from './attendee.interface';

export interface IAttendance extends IAudit {
  event: IEvent;
  attendees: IAttendee[];
  count: number;
}
