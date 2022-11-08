import { APP_INITIALIZER, FactoryProvider, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {
  AngularServicesModule,
  EventService, NavigationService
} from "@conferentia/angular-services";

// Environment
import { environment } from '../environments/environment';

// TODO: Load event data based on SaaS-oriented configuration (2022/11/04 - RO - #40)
// TODO: Simplify the interface for the factory function that loads event data. Trigger the setup of the current event to the inner context of the service.
export const loadCurrentEvent: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: loadEventFactory,
  deps: [EventService],
  multi: true,
};

function loadEventFactory(eventService: EventService) {
  return () => eventService.setFromEnvironment();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularServicesModule.forRoot(environment),
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    EventService,
    NavigationService,
    // TODO: Load event data based on SaaS-oriented configuration (2022/11/04 - RO - #40)
    loadCurrentEvent,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
