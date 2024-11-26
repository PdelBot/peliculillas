import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { FavoriteSerie } from '../../models/favorite-serie.interface';

@Component({
  selector: 'app-favorite-serie',
  templateUrl: './favorite-serie.component.html',
  styleUrl: './favorite-serie.component.css'
})
export class FavoriteSerieComponent implements OnInit {

  favouriteSeries: FavoriteSerie[] = [];
  constructor(private favoriteService: FavoritesService) { }

  ngOnInit(): void {
    this.favoriteService.getFavouriteSerie().subscribe((response) => {
      this.favouriteSeries = response.results;
    });
  }

  getFullImagePath(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${posterPath}`;
  }

}
