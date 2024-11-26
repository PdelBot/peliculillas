import { Component, OnInit } from '@angular/core';
import { FilmFavorite } from '../../models/favorite-film-list.interface';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-favorite-films',
  templateUrl: './favorite-films.component.html',
  styleUrl: './favorite-films.component.css'
})
export class FavoriteFilmsComponent implements OnInit {
  
  favouriteFilms: FilmFavorite[] = [];
  constructor(private favoriteService: FavoritesService) { }

  ngOnInit(): void {
    this.favoriteService.getFavouriteFilms().subscribe((response) => {
      this.favouriteFilms = response.results;
    });
  }

  getFullImagePath(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${posterPath}`;
  }
}
