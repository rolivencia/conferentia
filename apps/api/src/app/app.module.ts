import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { EventController } from '../event/event.controller';
import { EventService } from '../event/event.service';
import { ConnectorService } from '../shared/connectors/connector.service';
import { SanityConnector } from '../shared/connectors/sanity.connector';
import { CommitteeService } from '../committee/committee.service';
import { CommitteeController } from '../committee/committee.controller';
import { SubjectAreaController } from '../subject-area/subject-area.controller';
import { SubjectAreaService } from '../subject-area/subject-area.service';
import { SponsorService } from '../sponsor/sponsor.service';
import { SponsorController } from '../sponsor/sponsor.controller';
import { EntitySortingService } from '@conferentia/nest-modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [
    CommitteeController,
    EventController,
    SponsorController,
    SubjectAreaController,
  ],
  providers: [
    CommitteeService,
    EntitySortingService,
    EventService,
    SponsorService,
    SubjectAreaService,
    { provide: ConnectorService, useClass: SanityConnector },
  ],
})
export class AppModule {}
