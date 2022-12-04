import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ConferentiaRouteData, IEvent } from '@conferentia/models';

@Component({
  selector: 'conferentia-navigation-menu[event][pages]',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss'],
})
export class NavigationMenuComponent implements OnInit {
  @ViewChild('menuTemplate') menuTemplate: TemplateRef<any> | null = null;

  @Input() event: IEvent | undefined;
  @Input() pages: ConferentiaRouteData[] = [];

  constructor() {}

  ngOnInit(): void {}
}
