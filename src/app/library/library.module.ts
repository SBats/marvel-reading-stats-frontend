import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { TypesComponent } from './types/types.component';
import { LibraryRoutingModule } from './library-routing.module';

@NgModule({
  imports: [
    SharedModule,
    LibraryRoutingModule
  ],
  declarations: [
    DetailComponent,
    ListComponent,
    TypesComponent
  ]
})
export class LibraryModule { }
