import { Module } from '@nestjs/common';
import { EntitySortingService } from './sorting';

@Module({
  controllers: [],
  providers: [EntitySortingService],
  exports: [],
})
export class NestModulesModule {}
