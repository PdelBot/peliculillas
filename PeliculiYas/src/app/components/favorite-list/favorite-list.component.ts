import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { FavoriteFilmResponse, FilmFavorite } from '../../models/favorite-film-list.interface';
import { Film } from '../../models/film.interface';
import { FavoritesService } from '../../services/favorites.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrl: './favorite-list.component.css'
})
export class FavoriteListComponent {

  constructor(private router: Router) { }

  navigateToMovies(): void {
    this.router.navigate(['/favourites/movies']);
  }

  navigateToSeries(): void {
    this.router.navigate(['/favourites/series']);
  }

}
