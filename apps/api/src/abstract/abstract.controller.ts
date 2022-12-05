// Core
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

// Services
import { AbstractService } from './abstract.service';
import { Abstract } from '@conferentia/models';

@Controller('abstract')
export class AbstractController {
  constructor(private abstractService: AbstractService) {}

  @Get(':userId')
  public getByUserId(@Param() params): Promise<Abstract[]> {
    const userId: string = params.userId;
    return this.abstractService.getByUserId(userId);
  }

  @Post()
  public create(@Body() body: Partial<Abstract>): Promise<Abstract> {
    return this.abstractService.create(body);
  }
}
