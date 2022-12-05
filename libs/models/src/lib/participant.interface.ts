import { IAudit, IEvent } from '@conferentia/models';

export interface IParticipant extends IAudit {
  firstName: string;
  lastName: string;
  event: IEvent;
  // ToDo: Replace the hardcoded type for Participant Role for this programmatic interface (#62 - RO - 2022/11/16)
  role?: 'keynote' | 'plenary' | 'oral-presentations';
  courtesyTitle?: string;
  institution?: string;
  avatar?: string;
  curriculum?: string; // ToDo: Adapt the type of this property according to what's defined in #92 (RO - 2022/11/26)
}

// ToDo: Replace the hardcoded type for Participant Role for this programmatic interface (#62 - RO - 2022/11/16)
export interface ParticipantRole extends IAudit {
  name: string;
}
