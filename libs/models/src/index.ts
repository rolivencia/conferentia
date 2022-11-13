// Domain models
export { IEvent } from './lib/event.interface';
export { IActivity } from './lib/activity.interface';
export { IActivityType } from './lib/activity-type.interface';
export { IAttendance } from './lib/attendance.interface';
export { IAttendee } from './lib/attendee.interface';
export { IParticipant } from './lib/participant.interface';
export { ICommitteeArea } from './lib/committee-area.interface';
export { ICommitteeMember } from './lib/committee-member.interface';
export { ISubjectArea } from './lib/subject-area.interface';
export { IEventSponsor } from './lib/event-sponsor.interface';

export { IAudit } from './lib/audit.interface';
export { IImage } from './lib/image.interface';

// Infrastructure-related models
// TODO: Explore if these models should be moved to their own specific library (2022/11/07 - RO - #47)
export { IFrontendEnvironmentConfig } from './lib/frontend-environment-config.interface';
export { ConferentiaRoute, ConferentiaRouteData } from './lib/route.interface';
