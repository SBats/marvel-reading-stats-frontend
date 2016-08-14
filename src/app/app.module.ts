import { NgModule } from '@angular/core';
// Modules imports
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';

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
import { MarvelService } from './shared';

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
    MarvelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
