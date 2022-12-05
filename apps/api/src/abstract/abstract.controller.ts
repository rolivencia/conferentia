// Core
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

// Services
import { AbstractService } from './abstract.service';
import { Abstract } from '@conferentia/models';

@Controller('abstract')
export class AbstractController {
  constructor(private abstractService: AbstractService) {}

  @Get(':email')
  public getByEmail(@Param() params): Promise<Abstract> {
    return null;
  }

  @Post()
  public create(@Body() body: Partial<Abstract>): Promise<Abstract> {
    return null;
  }
}
