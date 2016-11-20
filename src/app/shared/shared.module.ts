import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ComicComponent } from './comic/comic.component';
import { ComicsListComponent } from './comics-list/comics-list.component';
import { FooterComponent } from './footer';
import { LoginFormComponent } from './login-form';
import { SubscribeFormComponent } from './subscribe-form';
import { ConnectionModalComponent } from './connection-modal';
import { LoaderComponent } from './loader';
import { TypeListComponent } from './type-list';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ComicComponent,
    ComicsListComponent,
    FooterComponent,
    LoginFormComponent,
    SubscribeFormComponent,
    ConnectionModalComponent,
    LoaderComponent,
    TypeListComponent
  ],
  exports: [
    CommonModule,
    ComicComponent,
    ComicsListComponent,
    FooterComponent,
    LoginFormComponent,
    SubscribeFormComponent,
    ConnectionModalComponent,
    LoaderComponent,
    TypeListComponent
  ]
})
export class SharedModule { }
