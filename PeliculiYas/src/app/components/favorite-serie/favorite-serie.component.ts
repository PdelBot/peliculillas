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

  constructor(private favoriteService: FavoritesService) { }

  ngOnInit(): void {
    this.favoriteService.getFavoriteSeries(this.currentPage).subscribe((response) => {
      this.favouriteSeries = response.results;
      this.totalPages = response.total_pages;
    });
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
}
