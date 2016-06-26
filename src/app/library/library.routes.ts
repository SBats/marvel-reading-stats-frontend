import { RouterConfig } from '@angular/router';

import { LibraryComponent } from './';
import { LibraryTypesComponent } from './types';
import { SeriesRouteComponent } from '../series';
import { SeriesDetailComponent } from '../series/detail';

export const libraryRoutes: RouterConfig = [
  {
    path: 'library',
    component: LibraryComponent,
    children: [
      { path: ':type', component: SeriesRouteComponent },
      { path: ':type/:id', component: SeriesDetailComponent },
      { path: '', component: LibraryTypesComponent },
    ]
  }
];
