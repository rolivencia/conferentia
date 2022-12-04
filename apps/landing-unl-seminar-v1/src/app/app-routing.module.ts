// Core
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';

// Routes
import { appRoutes } from './app.routes';
import { libRoutes } from '@conferentia/ionic-pages';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        // Only 'internal' routes are provided for routing.
        ...appRoutes.filter(
          (route) => !route.data || route?.data?.type !== 'external'
        ),
        ...libRoutes.filter(
          (route) => !route.data || route?.data?.type !== 'external'
        ),
      ],
      {
        preloadingStrategy: PreloadAllModules,
      }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
