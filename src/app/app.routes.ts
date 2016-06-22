import { provideRouter, RouterConfig } from '@angular/router';

import { HomeComponent } from './home';
import { LibraryComponent } from './library';

export const routes: RouterConfig = [
  { path: '', component: HomeComponent },
  { path: 'library', component: LibraryComponent },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
