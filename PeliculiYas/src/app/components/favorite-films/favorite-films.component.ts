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
  currentPage = 1;
  totalPages: number = 1;

  constructor(private favoriteService: FavoritesService, private filmService: ListService) { }

  ngOnInit(): void {
    this.favoriteService.getFavouriteFilms(this.currentPage).subscribe((response) => {
      this.favouriteFilms = response.results;
      this.totalPages = response.total_pages;
    });
  }

  getFullImagePath(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${posterPath}`;
  }

  removeFromFavourites(film: Film) {
    this.favoriteService.deleteFilmFromFavorite(film).subscribe(response => {
      console.log('Film removed from favourites:', response);
      this.loadFilms();
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
    if (this.favouriteFilms.length > 0) {
      this.loadFilms();
    }
  }
  loadFilms(): void {
    this.favoriteService.getFavouriteFilms(this.currentPage).subscribe((response) => {
      this.favouriteFilms = response.results;
    });

  }

}
