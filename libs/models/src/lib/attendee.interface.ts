import { IAudit } from './audit.interface';

export interface IAttendee extends IAudit {
  firstNames: string;
  lastNames: string;
  email: string;
}
