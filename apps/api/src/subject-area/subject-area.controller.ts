import { Controller, Get, Param } from '@nestjs/common';
import { ISubjectArea } from '@conferentia/models';
import { SubjectAreaService } from './subject-area.service';

@Controller('subject-area')
export class SubjectAreaController {
  constructor(private subjectAreaService: SubjectAreaService) {}

  @Get(':eventId')
  get(@Param() params): Promise<ISubjectArea[]> {
    const eventId: number | string = params.eventId;
    return this.subjectAreaService.get(eventId);
  }
}
