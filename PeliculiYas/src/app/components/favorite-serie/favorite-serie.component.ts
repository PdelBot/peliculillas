import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { FavoriteSerie } from '../../models/favorite-serie.interface';
import { Serie } from '../../models/serie.interface';

@Component({
  selector: 'app-favorite-serie',
  templateUrl: './favorite-serie.component.html',
  styleUrl: './favorite-serie.component.css'
})
export class FavoriteSerieComponent implements OnInit {

  favouriteSeries: FavoriteSerie[] = [];
  currentPage = 1;
  totalPages: number = 1;
  userName = '';
  userPhoto = '';
  banner: string = "/q8eejQcg1bAqImEV8jh8RtBD4uH.jpg";

  constructor(private favoriteService: FavoritesService) { }

  ngOnInit(): void {
    this.favoriteService.getFavoriteSeries(this.currentPage).subscribe((response) => {
      this.favouriteSeries = response.results;
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
  removeFromFavourites(serie: Serie): void {
    this.favoriteService.deleteSerieFromFavorite(serie).subscribe(response => {
      console.log('Film removed from favourites:', response);
      this.loadSeries();
    });
    window.location.reload();
  }
  changePage(page: number): void {
    this.currentPage = page;
    if (this.favouriteSeries.length > 0) {
      this.loadSeries();
    }
  }
  loadSeries(): void {
    this.favoriteService.getFavoriteSeries(this.currentPage).subscribe((response) => {
      this.favouriteSeries = response.results;
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
