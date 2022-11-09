// Core
import { Component, Input, OnInit } from '@angular/core';

// Models
import { ISubjectArea } from '@conferentia/models';

@Component({
  selector: 'conferentia-subject-area',
  templateUrl: './subject-area.component.html',
  styleUrls: ['./subject-area.component.scss'],
})
export class SubjectAreaComponent implements OnInit {
  @Input() subjectArea: ISubjectArea | undefined;
  constructor() {}

  ngOnInit(): void {}
}
