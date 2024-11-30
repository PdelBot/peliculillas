import { Component } from '@angular/core';
import { ListService } from '../../services/list.service';
import { Serie } from '../../models/serie.interface';
import { FavoritesService } from '../../services/favorites.service';
import { WatchListService } from '../../services/watch-list.service';
import * as bootstrap from 'bootstrap';


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
  currentPage: number = 1;
  totalPages: number = 1;




  constructor(private serieService: ListService, private favoriteService: FavoritesService, private watchlistService: WatchListService) { }

  ngOnInit(): void {
    this.loadSeries();
    this.loadFavouriteSeries();
    this.loadAllWatchListSeries();
  }
  loadSeries(): void {
    this.serieService.getSeriesPage(this.currentPage).subscribe((response) => {
      this.listadoSeries = response.results;
      this.totalPages = response.total_pages;
      console.log('Series cargadas:', this.listadoSeries);
    });
  }

  loadFavouriteSeries(): void {
    this.favoriteService.getAllFavoriteSeries().subscribe(response => {
      this.favoriteSeries = response;
      console.log('Series favoritas cargadas:', this.favoriteSeries);
    });
  }

  loadAllWatchListSeries(): void {
    this.watchlistService.getAllWatchListSeries().subscribe(response => {
      this.watchListSeries = response;
      console.log('Series en la lista de seguimiento cargadas:', this.watchListSeries);
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
    this.favoriteService.addSerieToFavourites(serie).subscribe(response => {
      console.log('Serie añadida a la lista de seguimiento:', response);
      this.loadFavouriteSeries(); // Actualizar la lista de seguimiento
    });
    this.showToast('Serie añadida a favoritos');
  }

  removeFromFavourites(serie: Serie) {
    this.favoriteService.deleteSerieFromFavorite(serie).subscribe(response => {
      console.log('Film removed from favourites:', response);
      this.loadFavouriteSeries();
    });
    this.showToast('Serie eliminada de favoritos');
  }


  isAdded(serie: Serie): boolean {

    return this.favoriteSeries.some(favouriteFilm => favouriteFilm.id === serie.id);

  }

  addToWatchlist(serie: Serie): void {
    this.watchlistService.addSerieToWatchList(serie).subscribe(response => {
      console.log('Serie añadida a la lista de seguimiento:', response);
      this.loadAllWatchListSeries(); // Actualizar la lista de seguimiento
    });
    this.showToast('Serie añadida a la lista de seguimiento');
  }

  isAddedWatchList(serie: Serie): boolean {
    return this.watchListSeries.some(watchListSeries => watchListSeries.id === serie.id);
  }

  removeFromWatchList(serie: Serie): void {
    this.watchlistService.deleteSerieFromWatchList(serie).subscribe(response => {
      console.log('Serie eliminada de la lista de seguimiento:', response);
      this.loadAllWatchListSeries(); // Actualizar la lista de seguimiento
    });
    this.showToast('Serie eliminada de la lista de seguimiento');
  }

  changePage(page: number): void {
    this.currentPage = page;
    if (this.watchListSeries.length > 0) {
      this.loadSeries();
    }
  }
  showToast(message: string) {
    const toastMessage = document.getElementById('toastMessage');
    if (toastMessage) {
      toastMessage.textContent = message;
    }

    const toastElement = document.getElementById('favToast');
    if (toastElement) {
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }
  }
  
}
