import { IAudit, IEvent } from '@conferentia/models';

export interface ISubjectArea extends IAudit {
  name: string;
  code: string;
  event?: IEvent;
  image?: string;
}
