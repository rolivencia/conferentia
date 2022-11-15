import { Module } from '@nestjs/common';
import { EntitySortingService } from './sorting/entity-sorting.service';

@Module({
  controllers: [],
  providers: [EntitySortingService],
  exports: [],
})
export class NestModulesModule {}
