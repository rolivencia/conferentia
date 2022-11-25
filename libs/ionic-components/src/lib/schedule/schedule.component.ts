// Core
import { Component, Input, OnInit } from '@angular/core';

// Models
import { Schedule } from '@conferentia/models';

@Component({
  selector: 'conferentia-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {

  @Input() schedule: Schedule | undefined;

  constructor() {}

  ngOnInit(): void {}
}
