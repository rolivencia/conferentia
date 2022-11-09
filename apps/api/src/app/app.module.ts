import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EventController } from '../event/event.controller';
import { EventService } from '../event/event.service';
import { ConnectorService } from '../shared/connectors/connector.service';
import { SanityConnector } from '../shared/connectors/sanity.connector';
import { CommitteeService } from '../committee/committee.service';
import { CommitteeController } from '../committee/committee.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController, CommitteeController, EventController],
  providers: [
    AppService,
    CommitteeService,
    EventService,

    { provide: ConnectorService, useClass: SanityConnector },
  ],
})
export class AppModule {}
