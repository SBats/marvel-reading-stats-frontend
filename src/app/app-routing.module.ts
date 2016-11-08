import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'library',
    loadChildren: 'app/library/library.module#LibraryModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
