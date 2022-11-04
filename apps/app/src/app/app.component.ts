import { Component } from '@angular/core';
@Component({
  selector: 'conferentia-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Acreditación', url: '/registration', icon: 'id-card' },
    { title: 'Actividades', url: '/schedule', icon: 'calendar' },
    { title: 'Disertantes', url: '/participants', icon: 'people' },
  ];
  constructor() {}
}
