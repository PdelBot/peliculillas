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
  constructor(private watchListService: WatchListService) { }

  ngOnInit(): void {
    this.watchListService.getWatchListFilms(this.currentPage).subscribe((response) => {
      this.watchListFilm = response.results;
      this.totalPages = response.total_pages;
    });
  }

  getFullImagePath(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${posterPath}`;
  }
  removeFromWatchList(film: Film) {
    this.watchListService.deleteFilmFromWatchList(film).subscribe(response => {
      console.log('Film removed from watchlist:', response);
    });
    this.loadFilms
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
}
