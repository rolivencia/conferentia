import { Controller, Get, Param } from '@nestjs/common';
import { CommitteeService } from './committee.service';
import { ICommitteeArea } from '@conferentia/models';

@Controller('committee')
export class CommitteeController {
  constructor(private committeeService: CommitteeService) {}

  @Get(':eventId')
  get(@Param() params): Promise<ICommitteeArea[]> {
    const eventId: number | string = params.eventId;
    return this.committeeService.getAreas(eventId);
  }
}
