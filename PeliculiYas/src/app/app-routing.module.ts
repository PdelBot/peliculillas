import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalMenuComponent } from './components/principal-menu/principal-menu.component';
import { MenuLateralComponent } from './shared/menu-lateral/menu-lateral.component';
import { FilmListComponent } from './components/film-list/film-list.component';

const routes: Routes = [
  {path: 'principal', component: PrincipalMenuComponent},
  {path: 'peliculas', component: FilmListComponent}, 
  {path: '', redirectTo: '/principal', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
