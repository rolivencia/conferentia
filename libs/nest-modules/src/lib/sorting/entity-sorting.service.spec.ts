import { Test, TestingModule } from '@nestjs/testing';
import { EntitySortingService } from './entity-sorting.service';

describe('EntitySortingService', () => {
  let service: EntitySortingService<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntitySortingService],
    }).compile();

    service = module.get<EntitySortingService<any>>(EntitySortingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
