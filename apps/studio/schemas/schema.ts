// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// List of child schemas
import activity from './activity';
import activityType from './activity-type';
import commiteeArea from './committee-area';
import commiteeMember from './committee-member';
import event from './event';
import eventSponsor from './event-sponsor';
import participant from './participant';
import subjectArea from './subject-area';
import user from './user';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    activity,
    activityType,
    commiteeArea,
    commiteeMember,
    event,
    eventSponsor,
    participant,
    subjectArea,
    user
  ]),
});
