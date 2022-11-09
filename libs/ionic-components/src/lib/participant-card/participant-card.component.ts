// Core
import { Component, Input, OnInit } from '@angular/core';

// Interfaces
import { IParticipant } from '@conferentia/models';

@Component({
  selector: 'conferentia-participant-card[participant]',
  templateUrl: './participant-card.component.html',
  styleUrls: ['./participant-card.component.scss'],
})
export class ParticipantCardComponent implements OnInit {
  @Input() participant: IParticipant | undefined;
  @Input() title: string = '';

  constructor() {}

  ngOnInit(): void {}
}
