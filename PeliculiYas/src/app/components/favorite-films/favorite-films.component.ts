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
  userName = '';
  userPhoto = '';
  banner: string = "/q8eejQcg1bAqImEV8jh8RtBD4uH.jpg";

  constructor(private favoriteService: FavoritesService, private filmService: ListService) { }

  ngOnInit(): void {
    this.favoriteService.getFavouriteFilms(this.currentPage).subscribe((response) => {
      this.favouriteFilms = response.results;
      this.totalPages = response.total_pages;
    });
    this.userName = localStorage.getItem('user_name') ?? '';
    this.userPhoto = localStorage.getItem('user_photo')
      ? `https://image.tmdb.org/t/p/original${localStorage.getItem(
        'user_photo'
      )}`
      : '';

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
    window.location.reload();

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
  isLoggedIn() {
    return localStorage.getItem('logged_in') === 'true';
  }
  logout() {
    localStorage.clear();
    window.location.href = 'http://localhost:4200';
  }

  bannerImg() {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${this.banner}`;
  }
  verificarImg() {
    const partes: string[] = this.userPhoto.split("/").filter(part => part !== '');

    if (partes[partes.length - 1] === "originalnull") {
      this.userPhoto = "https://static.wikia.nocookie.net/mamarre-estudios-espanol/images/9/9f/Benjamin.png/revision/latest?cb=20201222175350&path-prefix=es"
    }
    return this.userPhoto;

  }
}
