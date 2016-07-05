import { provideRouter, RouterConfig } from '@angular/router';

import { HomeComponent } from './home';
import { libraryRoutes } from './library';
import { collectionRoutes } from './collection';
import { statsRoutes } from './stats';

export const routes: RouterConfig = [
  { path: '', component: HomeComponent },
  ...libraryRoutes,
  ...collectionRoutes,
  ...statsRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
