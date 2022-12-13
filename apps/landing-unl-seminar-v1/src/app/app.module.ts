import { APP_INITIALIZER, FactoryProvider, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicComponentsModule } from '@conferentia/ionic-components';

// Providers
import {
  AngularServicesModule,
  EventService,
  NavigationService,
  UserService,
} from '@conferentia/angular-services';

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
    AuthModule.forRoot({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
    }),
    AngularServicesModule.forRoot(environment),
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicComponentsModule,
  ],
  providers: [
    EventService,
    NavigationService,
    UserService,
    // TODO: Load event data based on SaaS-oriented configuration (2022/11/04 - RO - #40)
    loadCurrentEvent,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
