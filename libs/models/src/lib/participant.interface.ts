import { IAudit, IEvent } from '@conferentia/models';

export interface IParticipant extends IAudit {
  firstName: string;
  lastName: string;
  event: IEvent;
  courtesyName?: string;
  institution?: string;
  avatar?: string;
  curriculum?: string[];
}
