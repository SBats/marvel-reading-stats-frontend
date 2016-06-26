import { RouterConfig } from '@angular/router';

import { LibraryComponent } from './';
import { LibraryTypesComponent } from './types';
import { LibraryListComponent } from './list';
import { LibraryDetailComponent } from './detail';

export const libraryRoutes: RouterConfig = [
  {
    path: 'library',
    component: LibraryComponent,
    children: [
      { path: ':type', component: LibraryListComponent },
      { path: ':type/:id', component: LibraryDetailComponent },
      { path: '', component: LibraryTypesComponent },
    ]
  }
];
