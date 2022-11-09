import { Test, TestingModule } from '@nestjs/testing';
import { SubjectAreaController } from './subject-area.controller';

describe('SubjectAreaController', () => {
  let controller: SubjectAreaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubjectAreaController],
    }).compile();

    controller = module.get<SubjectAreaController>(SubjectAreaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
