import { RouterModule, Routes } from '@angular/router';

import { homeRoutes } from './home';
import { libraryRoutes } from './library';
import { collectionRoutes } from './collection';
import { statsRoutes } from './stats';

export const routes: Routes = [
  ...homeRoutes,
  ...libraryRoutes,
  ...collectionRoutes,
  ...statsRoutes
];

export const routing = RouterModule.forRoot(routes);
