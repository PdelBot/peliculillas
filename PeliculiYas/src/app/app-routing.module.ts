import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalMenuComponent } from './components/principal-menu/principal-menu.component';
import { FilmListComponent } from './components/film-list/film-list.component';
import { SerieListComponent } from './components/serie-list/serie-list.component';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { FilmDetailsComponent } from './components/film-details/film-details.component';
import { SerieDetailsComponent } from './components/serie-details/serie-details.component';
import { PeopleDetailsComponent } from './components/people-details/people-details.component';
import { ApprovedComponent } from './components/approved/approved.component';
import { MisListasComponent } from './components/mis-listas/mis-listas.component';
import { MisListasDetailsComponent } from './components/mis-listas-details/mis-listas-details.component';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { FavoriteSerieComponent } from './components/favorite-serie/favorite-serie.component';
import { FavoriteFilmsComponent } from './components/favorite-films/favorite-films.component';
import { WatchListComponent } from './components/watch-list/watch-list.component';
import { WatchListFilmComponent } from './components/watch-list-film/watch-list-film.component';
import { WatchListSeriesComponent } from './components/watch-list-series/watch-list-series.component';
import { SearchBarResultsComponent } from './components/search-bar-results/search-bar-results.component';
import { FilteredResultsComponent } from './components/filtered-results/filtered-results.component';
import { RatingComponent } from './components/rating/rating.component';
import { RatingPeliculasComponent } from './components/rating-peliculas/rating-peliculas.component'; 
import { RatingMenuComponent } from './components/rating-menu/rating-menu.component';

const routes: Routes = [
  { path: 'principal', component: PrincipalMenuComponent },
  { path: 'peliculas', component: FilmListComponent },
  { path: 'series', component: SerieListComponent },
  { path: 'actores', component: PeopleListComponent },
  { path: 'peliculas/:id', component: FilmDetailsComponent },
  { path: 'series/:id', component: SerieDetailsComponent },
  { path: 'actores/:id', component: PeopleDetailsComponent },
  { path: 'approved', component: ApprovedComponent },
  { path: 'favorites', component: FavoriteListComponent },
  { path: 'favorites/movies', component: FavoriteFilmsComponent },
  { path: 'favorites/series', component: FavoriteSerieComponent },
  { path: 'watchlist', component: WatchListComponent },
  { path: 'watchlist/movies', component: WatchListFilmComponent },
  { path: 'watchlist/series', component: WatchListSeriesComponent },
  { path: 'search', component: SearchBarResultsComponent },
  { path: 'filtered-results', component: FilteredResultsComponent },
  { path: 'misListas', component: MisListasComponent },
  { path: 'misListas/:id', component: MisListasDetailsComponent },
  {path: 'rating', component: RatingComponent },
  {path : 'ratingPeliculas', component: RatingPeliculasComponent},
  { path: 'ratingMenu', component: RatingMenuComponent },
  { path: '', redirectTo: '/principal', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
