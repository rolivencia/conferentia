import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { filter, map, Observable, of } from 'rxjs';

// Models
import { IEvent } from '@conferentia/models';

// Services
import { EventService } from '../_services/event.service';

@Component({
  selector: 'conferentia-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  // TODO: Assign the navigable pages info reading the routes data (2022/11/04 - RO - #43)
  // TODO: Assign type to appPage objects (2022/11/04 - RO - #43)

  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Acreditación', url: '/registration', icon: 'qr-code' },
    { title: 'Actividades', url: '/schedule', icon: 'calendar' },
    { title: 'Disertantes', url: '/participants', icon: 'people' },
    { title: 'Patrocinadores', url: '/sponsors', icon: 'storefront' },
  ];
  // TODO: Assign type to currentRoute$ observable and content (2022/11/04 - RO - #43)
  public currentRoute$: Observable<any> = of(null);
  public currentEvent$: Observable<IEvent | null> = of(null);

  constructor(private route: ActivatedRoute, private router: Router) {
    const eventService = inject(EventService);
    this.currentEvent$ = eventService.currentEvent$;
  }

  ngOnInit() {
    // TODO: Improve solution to determine the active route and assign the corresponding header (2022/11/04 - RO - #43)
    this.currentRoute$ = this.router.events.pipe(
      filter(
        (event): event is RoutesRecognized => event instanceof RoutesRecognized
      ),
      map((event: RoutesRecognized) => {
        return event.state.root.firstChild;
      })
    );
  }
}
