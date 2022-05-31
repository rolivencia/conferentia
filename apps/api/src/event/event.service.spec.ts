import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';

describe('EventService', () => {
  let service: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventService],
    }).compile();

    service = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call get method with expected parameter', () => {
    const eventId: number = 42;
    const getByIdSpy = jest.spyOn(service, 'get');
    service.get(eventId);
    expect(getByIdSpy).toHaveBeenCalledWith(eventId);
  });
});
