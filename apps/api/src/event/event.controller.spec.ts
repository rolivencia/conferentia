import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { IEvent } from '@conferentia/models';

const mockEvents = [
  {
    id: 16,
    name: 'First Conf',
    activities: [
      { id: 1, title: 'Opening Act' },
      { id: 2, title: 'First Talk' },
      { id: 3, title: 'Coffee Break' },
      { id: 4, title: 'Keynote' },
      { id: 5, title: 'Closing Ceremony' },
    ],
  },
  {
    id: 45,
    name: 'Another Conf',
    activities: [
      { id: 1, title: 'Opening Act' },
      { id: 2, title: 'Wood Workshop' },
      { id: 3, title: 'Picnic at the campus' },
    ],
  },
];

describe('EventController', () => {
  let controller: EventController;
  let service: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [EventService],
    }).compile();

    service = module.get<EventService>(EventService);
    controller = module.get<EventController>(EventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an event with the given ID', () => {
    const eventId: number = 16;
    jest
      .spyOn(service, 'get')
      .mockImplementation(() =>
        mockEvents.filter((event: IEvent) => event.id === eventId).pop()
      );
    expect(controller.get(eventId).id).toEqual(eventId);
  });
});
