import { Controller, Get, Param } from '@nestjs/common';
import { EventService } from './event.service';
import { IEvent } from '@conferentia/models';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Get(':id')
  get(@Param() params): Promise<IEvent> {
    const id: number = params.id;
    return this.eventService.get(id);
  }

  @Get()
  getAll(): Promise<IEvent[]> {
    return this.eventService.getAll();
  }

}

