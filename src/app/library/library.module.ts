import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { TypesComponent } from './types/types.component';
import { LibraryRoutingModule } from './library-routing.module';
import { PaginationComponent } from './pagination';
import { AlphaPaginationComponent } from './alpha-pagination';

@NgModule({
  imports: [
    SharedModule,
    LibraryRoutingModule
  ],
  declarations: [
    DetailComponent,
    ListComponent,
    TypesComponent,
    PaginationComponent,
    AlphaPaginationComponent
  ]
})
export class LibraryModule { }
