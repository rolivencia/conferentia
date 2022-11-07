import { Data, Route } from "@angular/router";

export interface ConferentiaRouteData extends Data {
  title: string;
  url: string;
  icon: string;
}

export interface ConferentiaRoute extends Route {
  data?: ConferentiaRouteData;
}
