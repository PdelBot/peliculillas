import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MenuComponent } from './shared/menu/menu.component';
import { PrincipalMenuComponent } from './components/principal-menu/principal-menu.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { SerieListComponent } from './components/serie-list/serie-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PrincipalMenuComponent,
    SerieListComponent
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
