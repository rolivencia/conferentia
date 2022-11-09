import { Component, OnInit } from '@angular/core';
import { CommitteeService, EventService } from '@conferentia/angular-services';
import { Observable, of, switchMap } from 'rxjs';
import { ICommitteeArea, IEvent } from '@conferentia/models';

@Component({
  selector: 'conferentia-committees',
  templateUrl: './committees.page.html',
  styleUrls: ['./committees.page.scss'],
})
export class CommitteesPage implements OnInit {
  public committeeAreas$: Observable<ICommitteeArea[]> = of([]);
  constructor(
    private eventService: EventService,
    private committeeService: CommitteeService
  ) {}

  ngOnInit() {
    this.committeeAreas$ = this.eventService.currentEvent$.pipe(
      switchMap((event) => this.committeeService.get((event as IEvent)._id))
    );
  }
}
