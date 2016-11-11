import {
  NgModule
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header';
import { MarvelService } from './marvel.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    MarvelService
  ]
})
export class CoreModule { }
