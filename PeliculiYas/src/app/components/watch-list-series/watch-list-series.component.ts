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
  constructor(private watchListService: WatchListService) { }

  ngOnInit(): void {
    this.watchListService.getWatchListSeries().subscribe((response) => {
      this.watchListSeries = response.results;
    });

  }
  getFullImagePath(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${posterPath}`;
  }
  removeFromWatchList(serie: Serie) {
    this.watchListService.deleteSerieFromWatchList(serie).subscribe(response => {
      console.log('Film removed from watchlist:', response);
    });
    window.location.reload();
  }
}
