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
  _id: 'abc',
  _rev: '1',
  _type: 'Event',
  _createdAt: 'Mon Nov 07 2022 10:20:59 GMT-0300 (hora estándar de Argentina)',
  _updatedAt: 'Mon Nov 07 2022 10:20:59 GMT-0300 (hora estándar de Argentina)',
  endDate: new Date(),
  startDate: new Date(),
  image: '',
  title: 'My Event',
  name: 'The Test Conf',
};
