import { Component, OnInit } from '@angular/core';
import { WatchlistFilm } from '../../models/watchlist-film.interface';
import { WatchListService } from '../../services/watch-list.service';
import { Film } from '../../models/film.interface';

@Component({
  selector: 'app-watch-list-film',
  templateUrl: './watch-list-film.component.html',
  styleUrl: './watch-list-film.component.css'
})
export class WatchListFilmComponent implements OnInit {
  watchListFilm: WatchlistFilm[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  userName = '';
  userPhoto = '';
  banner: string = "/q8eejQcg1bAqImEV8jh8RtBD4uH.jpg";
  constructor(private watchListService: WatchListService) { }

  ngOnInit(): void {
    this.watchListService.getWatchListFilms(this.currentPage).subscribe((response) => {
      this.watchListFilm = response.results;
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
  removeFromWatchList(film: Film) {
    this.watchListService.deleteFilmFromWatchList(film).subscribe(response => {
      console.log('Film removed from watchlist:', response);
      this.loadFilms();
    });
    window.location.reload();
  }
  changePage(page: number): void {
    this.currentPage = page;
    if (this.watchListFilm.length > 0) {
      this.loadFilms();
    }
  }
  loadFilms(): void {
    this.watchListService.getWatchListFilms(this.currentPage).subscribe((response) => {
      this.watchListFilm = response.results;
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
