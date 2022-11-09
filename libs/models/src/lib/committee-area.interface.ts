import { IAudit, IEvent } from '@conferentia/models';
import { ICommitteeMember } from './committee-member.interface';

export interface ICommitteeArea extends IAudit {
  name: string;
  event: IEvent;
  chairs?: ICommitteeMember[];
  viceChairs?: ICommitteeMember[];
  members?: ICommitteeMember[];
}
