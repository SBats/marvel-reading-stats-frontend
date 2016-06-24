import { provideRouter, RouterConfig } from '@angular/router';

import { HomeComponent } from './home';
import { LibraryComponent } from './library';
import { CollectionComponent } from './collection';

export const routes: RouterConfig = [
  { path: '', component: HomeComponent },
  { path: 'library', component: LibraryComponent },
  { path: 'collection', component: CollectionComponent },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
