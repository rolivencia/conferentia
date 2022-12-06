// Core
import { Module } from '@nestjs/common';

// Controllers
import { AbstractController } from '../abstract/abstract.controller';
import { ActivityController } from '../activity/activity.controller';
import { CommitteeController } from '../committee/committee.controller';
import { EventController } from '../event/event.controller';
import { ParticipantController } from '../participant/participant.controller';
import { SanityConnector } from '../shared/connectors/sanity.connector';
import { SponsorController } from '../sponsor/sponsor.controller';
import { SubjectAreaController } from '../subject-area/subject-area.controller';
import { UserController } from '../user/user.controller';

// Modules
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

// Services
import { AbstractService } from '../abstract/abstract.service';
import { ActivityService } from '../activity/activity.service';
import { CommitteeService } from '../committee/committee.service';
import { ConnectorService } from '../shared/connectors/connector.service';
import { EntitySortingService } from '@conferentia/nest-modules';
import { EventService } from '../event/event.service';
import { ParticipantService } from '../participant/participant.service';
import { SponsorService } from '../sponsor/sponsor.service';
import { SubjectAreaService } from '../subject-area/subject-area.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MulterModule.register({
      dest: './files',
    }),
  ],
  controllers: [
    AbstractController,
    ActivityController,
    CommitteeController,
    EventController,
    ParticipantController,
    SponsorController,
    SubjectAreaController,
    UserController,
  ],
  providers: [
    AbstractService,
    ActivityService,
    CommitteeService,
    EntitySortingService,
    EventService,
    ParticipantService,
    SponsorService,
    SubjectAreaService,
    UserService,
    { provide: ConnectorService, useClass: SanityConnector },
  ],
})
export class AppModule {}
