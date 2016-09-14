import { NgModule, ApplicationRef } from '@angular/core';
// Modules imports
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

// Components imports
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { CollectionComponent } from './collection';
import { LibraryComponent } from './library';
import { LibraryDetailComponent } from './library/detail';
import { LibraryListComponent } from './library/list';
import { LibraryTypesComponent } from './library/types';
import { StatsComponent } from './stats';
import { ComicsListComponent } from './comics-list';
import { PaginatorComponent } from './paginator';
import { LoaderComponent } from './loader';
import { ElementsListComponent } from './elements-list';

// Pipes imports
import { TimeSpentPipe } from './stats';

// Services imports
import { StorageService } from './shared';
import { MRSService } from './shared';
import { ApiService } from './shared';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    routing
  ],
  declarations: [
    // MRS route Components
    AppComponent,
    HomeComponent,
    CollectionComponent,
    LibraryComponent,
    LibraryDetailComponent,
    LibraryListComponent,
    LibraryTypesComponent,
    StatsComponent,
    // MRS standalone components
    ComicsListComponent,
    ElementsListComponent,
    PaginatorComponent,
    LoaderComponent,
    // Pipes
    TimeSpentPipe
  ],
  providers: [
    StorageService,
    MRSService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
    hmrOnInit(store) {
      console.log('HMR store', store);
    }
    hmrOnDestroy(store) {
      let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
      // recreate elements
      store.disposeOldHosts = createNewHosts(cmpLocation);
      // remove styles
      removeNgStyles();
    }
    hmrAfterDestroy(store) {
      // display new elements
      store.disposeOldHosts();
      delete store.disposeOldHosts;
    }
}
