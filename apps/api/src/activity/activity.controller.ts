import { Controller, Get, Param, Query } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { IActivity, Schedule } from '@conferentia/models';

@Controller('activity')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Get('getByEventId/:eventId')
  public getByEventId(@Param() params): Promise<Schedule> {
    const eventId: number | string = params.eventId;
    return this.activityService.getScheduleByEventId(eventId);
  }

  @Get('getById/:activityId')
  public getById(@Param() params): Promise<IActivity> {
    const activityId: number | string = params.activityId;
    return this.activityService.getActivityById(activityId);
  }
}
