import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalMenuComponent } from './components/principal-menu/principal-menu.component';
import { FilmListComponent } from './components/film-list/film-list.component';
import { SerieListComponent } from './components/serie-list/serie-list.component';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { FilmDetailsComponent } from './components/film-details/film-details.component';
import { SerieDetailsComponent } from './components/serie-details/serie-details.component';
import { PeopleDetailsComponent } from './components/people-details/people-details.component';

const routes: Routes = [
  {path: 'principal', component: PrincipalMenuComponent},
  {path: 'peliculas', component: FilmListComponent}, 
  {path: 'series', component: SerieListComponent}, 
  {path: 'actores', component: PeopleListComponent},
  {path: 'peliculas/:id', component: FilmDetailsComponent}, 
  {path: 'series/:id', component: SerieDetailsComponent},
  {path: 'actores/:id', component: PeopleDetailsComponent},
  {path: '', redirectTo: '/principal', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
