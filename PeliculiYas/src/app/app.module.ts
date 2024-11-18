import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FilmListComponent } from './components/film-list/film-list.component';
import { SerieListComponent } from './components/serie-list/serie-list.component';
import { PeopleListComponent } from './components/people-list/people-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FilmListComponent,
    SerieListComponent,
    PeopleListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
