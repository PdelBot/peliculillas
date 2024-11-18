import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SerieDetailsComponent } from './components/serie-details/serie-details.component';
import { FilmDetailsComponent } from './components/film-details/film-details.component';
import { PeopleDetailsComponent } from './components/people-details/people-details.component';

@NgModule({
  declarations: [
    AppComponent,
    SerieDetailsComponent,
    FilmDetailsComponent,
    PeopleDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
