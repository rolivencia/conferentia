import { IAudit, IEvent } from '@conferentia/models';

export interface ISubjectArea extends IAudit {
  name: string;
  event: IEvent;
  image?: string;
}
