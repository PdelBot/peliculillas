import { Component, OnInit } from '@angular/core';
import { FilmFavorite } from '../../models/favorite-film-list.interface';
import { FavoritesService } from '../../services/favorites.service';
import { ListService } from '../../services/list.service';
import { Film } from '../../models/film.interface';

@Component({
  selector: 'app-favorite-films',
  templateUrl: './favorite-films.component.html',
  styleUrl: './favorite-films.component.css'
})
export class FavoriteFilmsComponent implements OnInit {

  favouriteFilms: FilmFavorite[] = [];

  constructor(private favoriteService: FavoritesService, private filmService: ListService) { }

  ngOnInit(): void {
    this.favoriteService.getFavouriteFilms().subscribe((response) => {
      this.favouriteFilms = response.results;
      console.log('Favoritos cargados:', this.favouriteFilms);
    });
  }

  getFullImagePath(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${posterPath}`;
  }

  removeFromFavourites(film: Film) {
    this.favoriteService.deleteFilmFromFavorite(film).subscribe(response => {
      console.log('Film removed from favourites:', response);
    });
    window.location.reload();
  }



}
