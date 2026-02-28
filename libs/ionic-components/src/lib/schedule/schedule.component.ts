// Core
import { Component, Input, OnInit } from '@angular/core';

// Models
import { Schedule } from '@conferentia/models';

const DEFAULT_NAVIGABLE_ACTIVITY_TYPES: string[] = [
  'Keynote',
  'Presentation',
  'Poster Session',
  'Conference',
];

@Component({
  selector: 'conferentia-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  @Input() schedule: Schedule | undefined;
  @Input() navigableActivityTypes: string[] = DEFAULT_NAVIGABLE_ACTIVITY_TYPES;

  constructor() {}

  ngOnInit(): void {}
}
