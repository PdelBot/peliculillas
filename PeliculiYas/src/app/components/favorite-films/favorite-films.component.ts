import { Component, OnInit } from '@angular/core';
import { FilmFavorite } from '../../models/favorite-film-list.interface';
import { FavoritesService } from '../../services/favorites.service';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-favorite-films',
  templateUrl: './favorite-films.component.html',
  styleUrl: './favorite-films.component.css'
})
export class FavoriteFilmsComponent implements OnInit {
  
  favouriteFilms: FilmFavorite[] = [];
  page = 1;
  totalPages: number = 1;

  constructor(private favoriteService: FavoritesService, private filmService: ListService) { }

  ngOnInit(): void {
    this.favoriteService.getFilmPage(this.page).subscribe((response) => {
      this.favouriteFilms = response.results;
      this.totalPages = response.total_pages;
      console.log('Favoritos cargados:', this.favouriteFilms);
    });
  }

  getFullImagePath(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${posterPath}`;
  }

  getPaginaUno() {
    this.page = 1;
    this.favoriteService.getFilmPage(this.page).subscribe((response) => {
      this.favouriteFilms = response.results;
    });
  }

  getNextPage() {
    this.page += 1;
    this.favoriteService.getFilmPage(this.page).subscribe((response) => {
      this.favouriteFilms = response.results;
    });
  }

  getLastPage() {
    this.page -= 1;
    this.favoriteService.getFilmPage(this.page).subscribe((response) => {
      this.favouriteFilms = response.results;
    });
  }
}
