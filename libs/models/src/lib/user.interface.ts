import { Country, IAudit } from '@conferentia/models';

export interface User extends IAudit {
  email: string;
  firstName: string;
  lastName: string;
  courtesyTitle: string;
  affiliation: string;
  country: Country;
  hasFinishedRegistration: boolean;
}
