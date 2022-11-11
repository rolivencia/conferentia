import { Controller, Get, Param } from '@nestjs/common';
import { SponsorService } from './sponsor.service';

// Events
import { IEventSponsor } from '@conferentia/models';

@Controller('sponsor')
export class SponsorController {
  constructor(private sponsorService: SponsorService) {}

  @Get(':eventId')
  get(@Param() params): Promise<IEventSponsor[]> {
    const eventId: number | string = params.eventId;
    return this.sponsorService.getByEventId(eventId);
  }
}
