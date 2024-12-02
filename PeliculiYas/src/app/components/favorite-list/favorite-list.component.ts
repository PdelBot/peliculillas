import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { FavoriteFilmResponse, FilmFavorite } from '../../models/favorite-film-list.interface';
import { Film } from '../../models/film.interface';
import { FavoritesService } from '../../services/favorites.service';
import { Router } from '@angular/router';
import { FavoriteSerie } from '../../models/favorite-serie.interface';
import { Serie } from '../../models/serie.interface';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrl: './favorite-list.component.css'
})
export class FavoriteListComponent implements OnInit {

  constructor(private router: Router, private favoriteService: FavoritesService) { }

  favoriteFilms: FilmFavorite[] = [];
  favoriteSeries: Serie[] = [];

  userName = '';
  userPhoto = '';
  banner: string = "/q8eejQcg1bAqImEV8jh8RtBD4uH.jpg";



  ngOnInit(): void {
    this.userName = localStorage.getItem('user_name') ?? '';
    this.userPhoto = localStorage.getItem('user_photo')
      ? `https://image.tmdb.org/t/p/original${localStorage.getItem(
        'user_photo'
      )}`
      : '';

      this.loadFavoriteFilms();
      this.loadFavoriteSeries();

  }
  loadFavoriteFilms(): void {
    this.favoriteService.getAllFavoriteFilms().subscribe(response => {
      this.favoriteFilms = response;
      console.log('Series en la lista de seguimiento cargadas:', this.favoriteFilms);
    });
  }

  loadFavoriteSeries(): void {
    this.favoriteService.getAllFavoriteSeries().subscribe(response => {
      this.favoriteSeries = response;
      console.log('Series en la lista de seguimiento cargadas:', this.favoriteFilms);
    });
  }

  navigateToMovies(): void {
    this.router.navigate(['/favorites/movies']);
  }

  navigateToSeries(): void {
    this.router.navigate(['/favorites/series']);
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
  getFilmPosterPath(): string {

    if (this.favoriteFilms.length === 0) {
      return 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg';
    } else {

      return `https://image.tmdb.org/t/p/w500${this.favoriteFilms[0].poster_path}`;
    }
  }
  getSeriePosterPath(): string {
    if (this.favoriteFilms.length === 0) {
      return 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg';
    } else {

      return `https://image.tmdb.org/t/p/w500${this.favoriteSeries[0].poster_path}`;
    }
  }
}
