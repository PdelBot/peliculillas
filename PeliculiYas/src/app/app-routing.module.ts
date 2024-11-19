import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalMenuComponent } from './components/principal-menu/principal-menu.component';
import { FilmListComponent } from './components/film-list/film-list.component';
import { SerieListComponent } from './components/serie-list/serie-list.component';
import { PeopleListComponent } from './components/people-list/people-list.component';

const routes: Routes = [
  {path: 'principal', component: PrincipalMenuComponent},
  {path: 'peliculas', component: FilmListComponent}, 
  {path: 'series', component: SerieListComponent}, 
  {path: 'actores', component: PeopleListComponent}, 
  {path: '', redirectTo: '/principal', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
