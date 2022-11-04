import { APP_INITIALIZER, FactoryProvider, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { EventService } from '../_services/event.service';

// TODO: Load event data based on SaaS-oriented configuration (2022/11/04 - RO - #40)
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
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    EventService,
    // TODO: Load event data based on SaaS-oriented configuration (2022/11/04 - RO - #40)
    loadCurrentEvent,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}


