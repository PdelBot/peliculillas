import { Component, OnInit } from '@angular/core';
import { WatchlistFilm } from '../../models/watchlist-film.interface';
import { WatchListService } from '../../services/watch-list.service';

@Component({
  selector: 'app-watch-list-film',
  templateUrl: './watch-list-film.component.html',
  styleUrl: './watch-list-film.component.css'
})
export class WatchListFilmComponent implements OnInit {
  watchListFilm: WatchlistFilm[] = [];
  constructor(private watchListService: WatchListService) { }

  ngOnInit(): void {
    this.watchListService.getWatchListFilms().subscribe((response) => {
      this.watchListFilm = response.results;
    });
  }

  getFullImagePath(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${posterPath}`;
  }
}
