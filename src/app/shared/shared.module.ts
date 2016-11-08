import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComicComponent } from './comic/comic.component';
import { ComicsListComponent } from './comics-list/comics-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ComicComponent,
    ComicsListComponent
  ],
  exports: [
    CommonModule,
    ComicComponent,
    ComicsListComponent
  ]
})
export class SharedModule { }
