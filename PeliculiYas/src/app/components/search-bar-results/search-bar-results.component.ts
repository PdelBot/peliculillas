import { Component, OnInit } from '@angular/core';
import { Film } from '../../models/film.interface';
import { Serie } from '../../models/serie.interface';
import { Actor } from '../../models/people.interface';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../../services/list.service';
import { FavoritesService } from '../../services/favorites.service';
import { WatchListService } from '../../services/watch-list.service';
import { LanguageSelectorService } from '../../services/language-selector.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-search-bar-results',
  templateUrl: './search-bar-results.component.html',
  styleUrl: './search-bar-results.component.css'
})
export class SearchBarResultsComponent implements OnInit {

  query = '';
  listadoPeliculas: Film[] = [];
  listadoSeries: Serie[] = [];
  actores: Actor[] = [];
  favouriteFilms: Film[] = [];
  watchListFilms: Film[] = [];
  favoriteSeries: Serie[] = [];
  watchListSeries: Serie[] = [];
  
  constructor(private route: ActivatedRoute, private listService: ListService,
    private favoriteService: FavoritesService, private watchlistService: WatchListService, private languageService: LanguageSelectorService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'] || '';
      if (this.query) {
        this.listService.searchMovies(this.query).subscribe(response => {
          this.listadoPeliculas = response.results;
        });
        this.listService.searchSeries(this.query).subscribe(response => {
          this.listadoSeries = response.results;
        });
        this.listService.searchPeople(this.query).subscribe(response => {
          this.actores = response.results;
        });
      }
    });
  }
  getFullImagePath(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${posterPath}`;
  }
  getColor({ valoracion }: { valoracion: number }): { [key: string]: string } {
    return this.listService.getColorValoracion({ valoracion });
  }
  isLoggedIn() {
    return localStorage.getItem('logged_in') === 'true';
  }
  isAddedFilm(film: Film): boolean {
    return this.favouriteFilms.some(favouriteFilm => favouriteFilm.id === film.id);
  }
  addToFavouritesFilm(film: Film): void {
    this.favoriteService.addFilmToFavourites(film).subscribe(response => {
      console.log('Film added to favourites:', response);
      this.loadFavoriteFilms();
      this.showToast('Film added to favourites');
    });

  }
  removeFromFavouritesFilm(film: Film) {
    this.favoriteService.deleteFilmFromFavorite(film).subscribe(response => {
      console.log('Film removed from favourites:', response);
      this.loadFavoriteFilms();
      this.showToast('Film removed from favourites');
    });
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
  loadFavoriteFilms(): void {
    this.favoriteService.getAllFavoriteFilms().subscribe(response => {
      this.favouriteFilms = response;
      console.log('Series favoritas cargadas:', this.favouriteFilms);
    });
  }

  loadWatchlistFilms(): void {
    this.watchlistService.getAllWatchListFilms().subscribe(response => {
      this.watchListFilms = response;
      console.log('Series en la lista de seguimiento cargadas:', this.watchListFilms);
    });
  }
  isAddedWatchListFilms(film: Film): boolean {
    return this.watchListFilms.some(watchListFilms => watchListFilms.id === film.id);
  }
  addToWatchlistFilms(film: Film): void {
    this.watchlistService.addFilmToWatchList(film).subscribe(response => {
      console.log('Film added to watchlist:', response);
      this.loadWatchlistFilms();
      this.showToast('Film added to watchlist');
    });
  }
  removeFromWatchListFilms(film: Film) {
    this.watchlistService.deleteFilmFromWatchList(film).subscribe(response => {
      console.log('Film removed from watchlist:', response);
      this.loadWatchlistFilms();
      this.showToast('Film removed from watchlist');
    });
  }
  getFirstGenreNameFilms(genreIds: number[]): string {
    if (genreIds.length === 0) {
      return 'Unknown';
    }
    return this.listService.getGenreName(genreIds[0]);
  }


  isAddedSerie(serie: Serie): boolean {
    return this.favoriteSeries.some(favouriteFilm => favouriteFilm.id === serie.id);
  }
  addToFavouritesSerie(serie: Serie): void {
    this.favoriteService.addSerieToFavourites(serie).subscribe(response => {
      console.log('Film added to favourites:', response);
      this.loadFavoriteSerie();
      this.showToast('Film added to favourites');
    });

  }
  removeFromFavouritesSerie(serie: Serie) {
    this.favoriteService.deleteSerieFromFavorite(serie).subscribe(response => {
      console.log('Film removed from favourites:', response);
      this.loadFavoriteSerie();
      this.showToast('Film removed from favourites');
    });
  }
 

  loadFavoriteSerie(): void {
    this.favoriteService.getAllFavoriteSeries().subscribe(response => {
      this.favoriteSeries = response;
      console.log('Series favoritas cargadas:', this.favouriteFilms);
    });
  }

  loadWatchlistSerie(): void {
    this.watchlistService.getAllWatchListSeries().subscribe(response => {
      this.watchListSeries = response;
      console.log('Series en la lista de seguimiento cargadas:', this.watchListSeries);
    });
  }
  isAddedWatchListSerie(serie: Serie): boolean {
    return this.watchListSeries.some(watchListSeries => watchListSeries.id === serie.id);
  }
  addToWatchlistSerie(serie: Serie): void {
    this.watchlistService.addSerieToWatchList(serie).subscribe(response => {
      console.log('Film added to watchlist:', response);
      this.loadFavoriteSerie();
      this.showToast('Film added to watchlist');
    });
  }
  removeFromWatchListSerie(serie: Serie) {
    this.watchlistService.deleteSerieFromWatchList(serie).subscribe(response => {
      console.log('Film removed from watchlist:', response);
      this.loadWatchlistSerie();
      this.showToast('Film removed from watchlist');
    });
  }
  getFirstGenreNameSerie(genreIds: number[]): string {
    if (genreIds.length === 0) {
      return 'Unknown';
    }
    return this.listService.getGenreName(genreIds[0]);
  }
}