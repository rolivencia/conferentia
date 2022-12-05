// Core
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';

// Routes
import { appRoutes } from './app.routes';
import { libRoutes } from '@conferentia/ionic-pages';
import { authenticationGuard } from '@conferentia/angular-services';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        // Only 'internal' routes are provided for routing.
        ...appRoutes.filter(
          (route) => !route.data || route?.data?.type !== 'external'
        ),
        // ToDo: Implement functional guards in lib-based routes (RO - 2022/12/05 - #103)
        ...libRoutes
          .filter((route) => !route.data || route?.data?.type !== 'external')
          .map((route) => ({ ...route, canLoad: [authenticationGuard] })),
      ],
      {
        preloadingStrategy: PreloadAllModules,
      }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
