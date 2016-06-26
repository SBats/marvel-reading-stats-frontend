import { RouterConfig } from '@angular/router';

import { LibraryComponent } from './';
import { LibraryTypesComponent } from './types';
import { SeriesRouteComponent } from '../series';
import { CharactersRouteComponent } from '../characters';
import { CreatorsRouteComponent } from '../creators';
import { EventsRouteComponent } from '../events';

export const libraryRoutes: RouterConfig = [
  {
    path: 'library',
    component: LibraryComponent,
    children: [
      { path: 'series',  component: SeriesRouteComponent },
      { path: 'characters',  component: CharactersRouteComponent },
      { path: 'creators',  component: CreatorsRouteComponent },
      { path: 'events',  component: EventsRouteComponent },
      { path: '',     component: LibraryTypesComponent },
    ]
  }
];
