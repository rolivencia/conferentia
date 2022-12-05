import { IAudit } from '@conferentia/models';

export interface User extends IAudit {
  email: string;
  hasFinishedRegistration: boolean;
}
