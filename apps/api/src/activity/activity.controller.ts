import { Controller, Get, Param } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { Schedule } from '@conferentia/models';

@Controller('activity')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Get(':eventId')
  public getByEventId(@Param() params): Promise<Schedule> {
    const eventId: number | string = params.eventId;
    return this.activityService.getScheduleByEventId(eventId);
  }
}
