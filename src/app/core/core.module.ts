import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';

import { HeaderComponent } from './header';

import {
  MarvelService,
  MarvelServiceConfig
} from './services/marvel.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([])
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