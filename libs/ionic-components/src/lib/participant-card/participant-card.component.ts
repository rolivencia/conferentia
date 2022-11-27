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

  public parsedCurriculum: string[] | undefined;

  constructor() {}

  ngOnInit(): void {
    this.parsedCurriculum = this.participant?.curriculum?.split('\n'); // ToDo: Adapt this assignation when paragraph parser component is available #92 (RO - 2022/11/26)

  }
}
