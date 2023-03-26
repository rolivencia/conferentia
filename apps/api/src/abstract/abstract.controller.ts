// Core
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
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
import { Multer } from 'multer';
import { SubmittedAbstractRevisionPayload } from '../../../../libs/models/src/lib/abstract.interface';

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

  @Put('review')
  public update(
    @Body() body: Pick<Abstract, '_id' | 'review' | 'status'>
  ): Promise<Abstract> {
    return this.abstractService.updateAbstractReview(body);
  }

  @Put('revision')
  public revision(
    @Body() body: Abstract
  ): Promise<SubmittedAbstractRevisionPayload> {
    return this.abstractService.updateAbstractLinkAndFlashPoster(body);
  }
}
