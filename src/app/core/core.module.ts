import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header';
import { FooterComponent } from './footer';

import {
  MarvelService,
  MarvelServiceConfig
} from './services/marvel.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    MarvelService
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`
        CoreModule is already loaded.
        Import it in the AppModule only
      `);
    }
  }

  static forRoot(config: MarvelServiceConfig): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {provide: MarvelService, useValue: config }
      ]
    };
  }
}