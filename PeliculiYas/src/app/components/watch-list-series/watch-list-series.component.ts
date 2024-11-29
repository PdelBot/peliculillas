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
  constructor(private watchListService: WatchListService) { }


  ngOnInit(): void {
    this.watchListService.getWatchListSeries(this.currentPage).subscribe((response) => {
      this.watchListSeries = response.results;
      this.totalPages = response.total_pages;
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
}
