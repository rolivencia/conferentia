import { Test, TestingModule } from '@nestjs/testing';
import { SubjectAreaService } from './subject-area.service';

describe('SubjectAreaService', () => {
  let service: SubjectAreaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubjectAreaService],
    }).compile();

    service = module.get<SubjectAreaService>(SubjectAreaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
