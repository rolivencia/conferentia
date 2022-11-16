// Core
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ConferentiaRouteData, IEvent } from '@conferentia/models';
import { appRoutes } from './app.routes';
import { filter, map, Observable, of, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { EventService, NavigationService } from '@conferentia/angular-services';

@Component({
  selector: 'conferentia-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public appPages: ConferentiaRouteData[] = appRoutes
    .filter((route) => !!route.data)
    .map((route) => route.data) as ConferentiaRouteData[];

  // TODO: Assign type to currentRoute$ observable and content (2022/11/04 - RO - #43)
  public currentEvent$: Observable<IEvent | null> = of(null);

  private destroyed$: Subject<boolean> = new Subject();

  constructor(
    private titleService: Title,
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const eventService: EventService = inject(EventService);
    this.currentEvent$ = eventService.currentEvent$;
  }

  ngOnInit() {
    // TODO: Improve solution to determine the active route and assign the corresponding header (2022/11/04 - RO - #43)
    this.router.events
      .pipe(
        takeUntil(this.destroyed$),
        filter(
          (event): event is RoutesRecognized =>
            event instanceof RoutesRecognized
        ),
        map((event: RoutesRecognized) => {
          return event.state.root.firstChild;
        })
      )
      .subscribe((route) => {
        this.navigationService.currentRoute$.next(route);
      });

    this.currentEvent$.pipe(takeUntil(this.destroyed$)).subscribe((event) => {
      if (!!event) {
        this.titleService.setTitle(event.name);
      }
    });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
