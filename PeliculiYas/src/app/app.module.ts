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

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PrincipalMenuComponent,
    SerieListComponent,
    RoundedVotePipe,
    FooterComponent,
    MenuLateralComponent,
    FilmListComponent
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
