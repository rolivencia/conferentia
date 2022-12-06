import { Test, TestingModule } from '@nestjs/testing';
import { AbstractController } from './abstract.controller';

describe('AbstractController', () => {
  let controller: AbstractController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AbstractController],
    }).compile();

    controller = module.get<AbstractController>(AbstractController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
