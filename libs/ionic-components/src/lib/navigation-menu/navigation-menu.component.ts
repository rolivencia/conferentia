import {
  Component,
  EnvironmentInjector,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ConferentiaRouteData, IEvent } from '@conferentia/models';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'conferentia-navigation-menu[event][pages]',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss'],
})
export class NavigationMenuComponent implements OnInit {
  @ViewChild('menuTemplate') menuTemplate: TemplateRef<any> | null = null;

  @Input() event: IEvent | undefined;
  @Input() pages: ConferentiaRouteData[] = [];

  public links: ConferentiaMenuLink[] = [];

  constructor(private injector: EnvironmentInjector) {}

  ngOnInit(): void {
    this.assignLinksVisibility();
  }

  // Provides an injection context and executes an action attached to a specific route
  invokeAction(data: ConferentiaRouteData) {
    this.injector.runInContext(() => {
      if (data && data.action) {
        data.action();
      }
    });
  }

  // Execute the render function of each route, if available, to determine if a given link must be rendered in the menu
  assignLinksVisibility() {
    this.injector.runInContext(() => {
      for (const page of this.pages) {
        const visibility = !page.render ? of(true) : page.render();
        this.links.push({ ...page, visible: visibility });
      }
    });
  }
}

export interface ConferentiaMenuLink extends ConferentiaRouteData {
  visible: Observable<boolean>;
}
