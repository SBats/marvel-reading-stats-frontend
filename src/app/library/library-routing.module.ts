import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypesComponent } from './types';
import { ListComponent } from './list';
import { DetailComponent } from './detail';

export const routes: Routes = [
  { path: '', component: TypesComponent },
  { path: ':type', component: ListComponent },
  { path: ':type/:element', component: DetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule {}
