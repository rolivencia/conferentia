// Core
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';

// Routes
import { appRoutes } from './app.routes';

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
