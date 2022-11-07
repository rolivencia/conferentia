// Core
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Models
import { IFrontendEnvironmentConfig } from '@conferentia/models';

// Services
import { EventService } from './event.service';

@NgModule({
  imports: [CommonModule],
  providers: [EventService],
})
export class AngularServicesModule {
  static forRoot(
    frontendEnvironmentConfig: IFrontendEnvironmentConfig
  ): ModuleWithProviders<AngularServicesModule> {
    return {
      ngModule: AngularServicesModule,
      providers: [{ provide: 'env', useValue: frontendEnvironmentConfig }],
    };
  }
}
