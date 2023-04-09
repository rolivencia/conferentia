// Core
import { Component, Input, OnInit } from '@angular/core';

// Models
import { Schedule } from '@conferentia/models';
import { APP_ROUTE_TREE } from '../../../../../apps/landing-unl-seminar-v1/src/app/app.routes';

@Component({
  selector: 'conferentia-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  @Input() schedule: Schedule | undefined;

  // ToDo: Parametrize which activity types are navigable based on config
  navigableActivityTypes: string[] = [
    'Keynote',
    'Presentation',
    'Poster Session',
    'Conference',
  ];

  constructor() {}

  ngOnInit(): void {}
}
