import { Controller, Get, Param } from '@nestjs/common';
import { EventService } from './event.service';
import { IEvent } from '@conferentia/models';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Get(':id')
  get(@Param() params): IEvent {
    const id: number = parseInt(params.id)
    return this.eventService.get(id);
  }
}

