import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComicComponent } from './comic/comic.component';
import { ComicsListComponent } from './comics-list/comics-list.component';
import { FooterComponent } from './footer';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ComicComponent,
    ComicsListComponent,
    FooterComponent
  ],
  exports: [
    CommonModule,
    ComicComponent,
    ComicsListComponent,
    FooterComponent
  ]
})
export class SharedModule { }
