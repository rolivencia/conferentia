import { Component, Input, OnInit } from '@angular/core';
import { IActivity } from '@conferentia/models';

@Component({
  selector: 'conferentia-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss'],
})
export class ActivityCardComponent implements OnInit {
  @Input() activity!: IActivity;
  constructor() {}

  ngOnInit(): void {}
}
