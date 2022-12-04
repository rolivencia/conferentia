import { Data, Route } from '@angular/router';
import { Observable } from 'rxjs';

export interface ConferentiaRouteData extends Data {
  title: string;
  url: string;
  icon: string;
  action?: () => void;
  type?: 'internal' | 'external';
  render?: () => Observable<boolean>;
}

export interface ConferentiaRoute extends Route {
  data?: ConferentiaRouteData;
}
