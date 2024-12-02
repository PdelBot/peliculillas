import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MenuComponent } from './shared/menu/menu.component';
import { PrincipalMenuComponent } from './components/principal-menu/principal-menu.component';
import { provideHttpClient } from '@angular/common/http';
import { SerieListComponent } from './components/serie-list/serie-list.component';
import { RoundedVotePipe } from './pipes/rounded-vote.pipe';
import { FooterComponent } from './shared/footer/footer.component';
import { MenuLateralComponent } from './shared/menu-lateral/menu-lateral.component';
import { FilmListComponent } from './components/film-list/film-list.component';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { MenuListComponent } from './shared/menu-list/menu-list.component';
import { FilmDetailsComponent } from './components/film-details/film-details.component';
import { SerieDetailsComponent } from './components/serie-details/serie-details.component';
import { PeopleDetailsComponent } from './components/people-details/people-details.component';
import { ApprovedComponent } from './components/approved/approved.component';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { FavoriteFilmsComponent } from './components/favorite-films/favorite-films.component';
import { FavoriteSerieComponent } from './components/favorite-serie/favorite-serie.component';
import { WatchListComponent } from './components/watch-list/watch-list.component';
import { WatchListSeriesComponent } from './components/watch-list-series/watch-list-series.component';
import { WatchListFilmComponent } from './components/watch-list-film/watch-list-film.component';
import { MenuRightComponent } from './shared/menu-right/menu-right.component';
import { FormsModule } from '@angular/forms';
import { SearchBarResultsComponent } from './components/search-bar-results/search-bar-results.component';
import { FilteredResultsComponent } from './components/filtered-results/filtered-results.component';
import { MisListasComponent } from './components/mis-listas/mis-listas.component';
import { MisListasDetailsComponent } from './components/mis-listas-details/mis-listas-details.component';
import { SerieNamePipe } from './pipes/serie-name.pipe';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PrincipalMenuComponent,
    SerieListComponent,
    RoundedVotePipe,
    FooterComponent,
    MenuLateralComponent,
    FilmListComponent,
    PeopleListComponent,
    MenuListComponent,
    FilmDetailsComponent,
    SerieDetailsComponent,
    PeopleDetailsComponent,
    ApprovedComponent,
    FavoriteListComponent,
    FavoriteFilmsComponent,
    FavoriteSerieComponent,
    WatchListComponent,
    WatchListSeriesComponent,
    WatchListFilmComponent,
    MenuRightComponent,
    SearchBarResultsComponent,
    FilteredResultsComponent,
    MisListasComponent,
    MisListasDetailsComponent,
    MenuRightComponent,
    SerieNamePipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
