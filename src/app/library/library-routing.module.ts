import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypesComponent } from './types';

export const routes: Routes = [
  { path: '', redirectTo: 'types', pathMatch: 'full' },
  { path: 'types', component: TypesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule {}
