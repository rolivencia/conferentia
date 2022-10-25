import { IAudit } from './audit.interface';

export interface IParticipant extends IAudit {
  name: string;
  gender: string;
  institution: string;
  avatar: string;
  curriculum: string[];
}
