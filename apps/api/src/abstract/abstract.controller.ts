// Core
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

// Models
import { Abstract, SubmittedAbstractPayload } from '@conferentia/models';

// Services
import { AbstractService } from './abstract.service';

// Typings
import { Express } from 'express';

@Controller('abstract')
export class AbstractController {
  constructor(private abstractService: AbstractService) {}

  @Get(':id')
  public getById(@Param() params): Promise<Abstract> {
    const id: string = params.id;
    return this.abstractService.getById(id);
  }

  @Get('event/:eventId')
  public getAll(@Param() params): Promise<Abstract[]> {
    const eventId: string = params.eventId;
    return this.abstractService.getAll(eventId);
  }

  @Get('user/:userId')
  public getByUserId(@Param() params): Promise<Abstract[]> {
    const userId: string = params.userId;
    return this.abstractService.getByUserId(userId);
  }

  @Post()
  public create(@Body() body: SubmittedAbstractPayload): Promise<Abstract> {
    return this.abstractService.create(body);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('uploaded-abstract'))
  public uploadAbstractFile(
    @UploadedFile() file: Express.Multer.File
  ): Express.Multer.File {
    return file;
  }
}
