import { provideRouter, RouterConfig } from '@angular/router';

import { HomeComponent } from './home';
import { libraryRoutes } from './library';
import { collectionRoutes } from './collection';

export const routes: RouterConfig = [
  { path: '', component: HomeComponent },
  ...libraryRoutes,
  ...collectionRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
