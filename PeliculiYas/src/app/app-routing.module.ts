import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalMenuComponent } from './components/principal-menu/principal-menu.component';

const routes: Routes = [
  {path: 'principal', component: PrincipalMenuComponent},
  {path: '', redirectTo: '/principal', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
