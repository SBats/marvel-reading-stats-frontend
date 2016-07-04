import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { ELEMENT_PROBE_PROVIDERS } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent } from './app/app.component';
import { APP_ROUTER_PROVIDERS } from './app/app.routes';
import { MRS_APP_PROVIDER } from './app/shared';

const ENV_PROVIDERS = [];
declare const process;
// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === 'build') {
  enableProdMode();
} else {
  ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
}

bootstrap(AppComponent, [
    // These are dependencies of our App
    ...HTTP_PROVIDERS,
    ...APP_ROUTER_PROVIDERS,
    ...MRS_APP_PROVIDER,
    ...ENV_PROVIDERS
  ])
  .catch(err => console.error(err));
