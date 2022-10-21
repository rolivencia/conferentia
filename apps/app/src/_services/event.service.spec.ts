import { TestBed } from '@angular/core/testing';

import { EventService } from './event.service';
import { IEvent } from '@conferentia/models';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('EventService', () => {
  let service: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(EventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the data from a specific event', () => {
    const spy = jest
      .spyOn(service, 'get')
      .mockReturnValue(of(expectedEventData));
    service.get(12).subscribe((x) => {
      expect(x).toEqual(expectedEventData);
    });
    expect(spy).toHaveBeenCalledWith(12);
  });
});

const expectedEventData: IEvent = {
  id: 12,
  name: 'The Test Conf',
  activities: [
    { id: 1, title: 'Opening' },
    { id: 12, title: 'This is really the first Keynote!' },
    { id: 23, title: 'Coffee Break' },
    { id: 45, title: 'Second Keynote' },
    { id: 45, title: 'Closing' },
  ],
};
