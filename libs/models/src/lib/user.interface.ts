import { Country, IAudit } from '@conferentia/models';

export interface User extends IAudit {
  email: string;
  firstName: string;
  lastName: string;
  courtesyTitle: string;
  affiliation: string;
  country: Country;
  hasFinishedRegistration: boolean;
  wantsToEvaluatePapers?: boolean;
  role: Role;
}

export interface Role extends IAudit {
  key: string;
  name: string;
}

export enum EUserRole {
  ADMINISTRATOR = 'admin',
  ATTENDEE = 'attendee',
  REVIEWER = 'reviewer',
}
