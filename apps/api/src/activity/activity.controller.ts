import { Controller, Get, Param } from '@nestjs/common';
import { IActivity } from '@conferentia/models';
import { ActivityService } from './activity.service';

@Controller('activity')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Get(':eventId')
  public getByEventId(@Param() params): Promise<IActivity[]> {
    const eventId: number = params.eventId;
    return this.activityService.getByEventId(eventId);
  }
}
