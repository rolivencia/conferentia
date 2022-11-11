import { IAudit } from '@conferentia/models';

export interface IEventSponsor extends IAudit {
  name: string;
  image: string;
  url?: string;
}
