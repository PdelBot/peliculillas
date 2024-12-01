import { Component, OnInit } from '@angular/core';
import { WatchListService } from '../../services/watch-list.service';
import { WatchListSerie } from '../../models/watchlist-serie.interface';
import { Serie } from '../../models/serie.interface';

@Component({
  selector: 'app-watch-list-series',
  templateUrl: './watch-list-series.component.html',
  styleUrl: './watch-list-series.component.css'
})
export class WatchListSeriesComponent implements OnInit {
  watchListSeries: WatchListSerie[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  userName = '';
  userPhoto = '';
  banner: string = "/q8eejQcg1bAqImEV8jh8RtBD4uH.jpg";

  constructor(private watchListService: WatchListService) { }


  ngOnInit(): void {
    this.watchListService.getWatchListSeries(this.currentPage).subscribe((response) => {
      this.watchListSeries = response.results;
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
  removeFromWatchList(serie: Serie) {
    this.watchListService.deleteSerieFromWatchList(serie).subscribe(response => {
      console.log('Film removed from watchlist:', response);
    });
    this.loadSeries();
  }
  changePage(page: number): void {
    this.currentPage = page;
    if (this.watchListSeries.length > 0) {
      this.loadSeries();
    }
  }

  loadSeries(): void {
    this.watchListService.getWatchListSeries(this.currentPage).subscribe((response) => {
      this.watchListSeries = response.results;
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
