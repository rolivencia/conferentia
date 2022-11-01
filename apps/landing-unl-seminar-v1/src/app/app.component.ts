import { Component } from '@angular/core';
@Component({
  selector: 'conferentia-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/folder/Home', icon: 'home' },
    { title: 'General Information', url: '/folder/General Information', icon: 'information-circle' },
    { title: 'Abstract Submision', url: '/folder/Abstract Submision', icon: 'newspaper' },
    { title: 'Keynote Speakers', url: '/folder/Keynote Speakers', icon: 'school' },
    { title: 'Oral Presentations', url: '/folder/Oral Presentations', icon: 'mic' },
    { title: 'Poster Programme', url: '/folder/Poster Programme', icon: 'calendar' },
    { title: 'Committees', url: '/folder/Committees', icon: 'people' },
    { title: 'Registration', url: '/folder/Registration', icon: 'id-card' },
    { title: 'Travel Information', url: '/folder/Travel Information', icon: 'airplane' },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
