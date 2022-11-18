import { Controller, Get, Param } from '@nestjs/common';
import { IParticipant } from '@conferentia/models';
import { ParticipantService } from './participant.service';

@Controller('participant')
export class ParticipantController {
  constructor(private participantService: ParticipantService) {}

  @Get(':eventId')
  public getByEventId(@Param() params): Promise<IParticipant[]> {
    const eventId: number | string = params.eventId;
    return this.participantService.getByEventId(eventId);
  }
}
