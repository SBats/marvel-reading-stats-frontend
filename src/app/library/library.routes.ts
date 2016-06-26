import { RouterConfig } from '@angular/router';

import { LibraryComponent } from './';
import { LibraryTypesComponent } from './types';
import { SeriesRouteComponent } from '../series';
import { SeriesDetailComponent } from '../series/detail';
import { CharactersRouteComponent } from '../characters';
import { CreatorsRouteComponent } from '../creators';
import { EventsRouteComponent } from '../events';

export const libraryRoutes: RouterConfig = [
  {
    path: 'library',
    component: LibraryComponent,
    children: [
      { path: 'series', component: SeriesRouteComponent },
      { path: 'characters', component: CharactersRouteComponent },
      { path: 'creators', component: CreatorsRouteComponent },
      { path: 'events', component: EventsRouteComponent },
      { path: '', component: LibraryTypesComponent },
      { path: 'series/:id', component: SeriesDetailComponent },
      { path: 'characters/:id', component: SeriesDetailComponent },
      { path: 'creators/:id', component: SeriesDetailComponent },
      { path: 'events/:id', component: SeriesDetailComponent }
    ]
  }
];
