import { IAudit } from './audit.interface';

export interface Author extends IAudit {
  firstName: string;
  lastName: string;
  institution: string;
}
