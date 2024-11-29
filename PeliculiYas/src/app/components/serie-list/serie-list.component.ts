import { Component } from '@angular/core';
import { ListService } from '../../services/list.service';
import { Serie } from '../../models/serie.interface';
import { FavoritesService } from '../../services/favorites.service';
import { WatchListService } from '../../services/watch-list.service';

@Component({
  selector: 'app-serie-list',
  templateUrl: './serie-list.component.html',
  styleUrl: './serie-list.component.css'
})
export class SerieListComponent {

  listadoSeries: Serie[] = [];
  page: number = 1;
  favoriteSeries: Serie[] = [];
  watchListSeries: Serie[] = [];



  constructor(private serieService: ListService, private favoriteService: FavoritesService, private watchlistService: WatchListService) { }

  ngOnInit(): void {
    this.serieService.getPopularSeries().subscribe((response) => {
      this.listadoSeries = response.results;
    });
    this.favoriteService.getFavouriteSerie().subscribe(response => {
      this.favoriteSeries = response.results;
    });
    this.watchlistService.getWatchListSeries().subscribe(response => {
      this.watchListSeries = response.results;
    });
  }
  getFullImagePath(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${posterPath}`;
  }

  getPaginaUno() {
    this.page = 1;
    this.serieService.getSeriesPage(this.page).subscribe((response) => {
      this.listadoSeries = response.results;
    });
  }

  getNextPage() {
    this.page += 1;
    this.serieService.getSeriesPage(this.page).subscribe((response) => {
      this.listadoSeries = response.results;
    });
  }
  getLastPage() {
    this.page -= 1;
    this.serieService.getSeriesPage(this.page).subscribe((response) => {
      this.listadoSeries = response.results;
    });
  }

  getColor({ valoracion }: { valoracion: number }): { [key: string]: string } {
    return this.serieService.getColorValoracion({ valoracion });
  }

  addToFavourites(serie: Serie): void {
    if (this.favoriteSeries.length < 20) {

      this.favoriteService.addSerieToFavourites(serie).subscribe(response => {
        console.log('Film added to favourites:', response);
      });
      window.location.reload();
    } else {
      alert('You have reached the maximum number of series in your favorites list. Please remove a movie before adding a new one.');
    }
  }

  removeFromFavourites(serie: Serie) {
    this.favoriteService.deleteSerieFromFavorite(serie).subscribe(response => {
      console.log('Film removed from favourites:', response);
    });
    window.location.reload();
  }


  isAdded(serie: Serie): boolean {

    return this.favoriteSeries.some(favouriteFilm => favouriteFilm.id === serie.id);

  }

  addToWatchlist(serie: Serie): void {
    if (this.watchListSeries.length < 20) {

      this.watchlistService.addSerieToWatchList(serie).subscribe(response => {
        console.log('Film added to watchlist:', response);
      });
      window.location.reload();
    } else {
      alert('You have reached the maximum number of series in your watchlist. Please remove a movie before adding a new one.');
    }
  }

  isAddedWatchList(serie: Serie): boolean {

    return this.watchListSeries.some(watchListSeries => watchListSeries.id === serie.id);


  }

  removeFromWatchList(serie: Serie) {
    this.watchlistService.deleteSerieFromWatchList(serie).subscribe(response => {
      console.log('Film removed from watchlist:', response);
    });
    window.location.reload();
  }


}
