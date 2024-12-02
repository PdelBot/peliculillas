import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ListService } from '../../services/list.service';
import { Film } from '../../models/film.interface';

import { MisListasService } from '../../services/mis-listas.service';
import { myList, myListResponse } from '../../models/my-list.interface';

import { FavoritesService } from '../../services/favorites.service';
import { WatchListService } from '../../services/watch-list.service';
import * as bootstrap from 'bootstrap';
import { Subscription } from 'rxjs';
import { LanguageSelectorService } from '../../services/language-selector.service';


@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrl: './film-list.component.css'
})
export class FilmListComponent implements OnInit {

  misListas: myList[] = [];
  selectedListId: string = "";
  page = 1;
  listadoPeliculas: Film[] = [];
  favouriteFilms: Film[] = [];
  watchListFilms: Film[] = [];
  currentPage: number = 1;
  totalPages: number = 1;



  constructor(private filmService: ListService, private favoriteService: FavoritesService, private watchlistService: WatchListService, private languageService: LanguageSelectorService
  ) { };


  ngOnInit(): void {
    this.filmService.getPopularFilmDesc().subscribe((response) => {
      this.listadoPeliculas = response.results;

    });
    this.loadFilms();
    this.loadFavoriteFilms();
    this.loadWatchlistFilms();
    this.languageService.selectedLanguage$.subscribe(() => {
      this.loadFilms();
    });
  }
  isLoggedIn() {
    return localStorage.getItem('logged_in') === 'true';
  }
  logout() {
    localStorage.clear();
    window.location.href = 'http://localhost:4200';
  }

  loadFilms(): void {
    this.filmService.getFilmPage(this.currentPage).subscribe((response) => {
      this.listadoPeliculas = response.results;
      this.totalPages = response.total_pages;
      console.log('Series cargadas:', this.listadoPeliculas);
    });
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




  getFullImagePath(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${posterPath}`;
  }

  getPaginaUno() {
    this.page = 1;
    this.filmService.getFilmPage(this.page).subscribe((response) => {
      this.listadoPeliculas = response.results;
    });
  }

  getNextPage() {
    this.page += 1;
    this.filmService.getFilmPage(this.page).subscribe((response) => {
      this.listadoPeliculas = response.results;
    });
  }

  getLastPage() {
    this.page -= 1;
    this.filmService.getFilmPage(this.page).subscribe((response) => {
      this.listadoPeliculas = response.results;
    });
  }

  getColor({ valoracion }: { valoracion: number }): { [key: string]: string } {
    return this.filmService.getColorValoracion({ valoracion });
  }

  getGenreNames(genreIds: number[]): string[] {
    return genreIds.map(id => this.filmService.getGenreName(id));
  }

  getFirstGenreName(genreIds: number[]): string {
    if (genreIds.length === 0) {
      return 'Unknown';
    }
    return this.filmService.getGenreName(genreIds[0]);
  }
  //para que aparezca la nueva lista
  actualizarListado(nuevoListado: Film[]) {
    this.listadoPeliculas = nuevoListado;
  }

  addToFavourites(film: Film): void {
    this.favoriteService.addFilmToFavourites(film).subscribe(response => {
      console.log('Film added to favourites:', response);
      this.loadFavoriteFilms();
      this.showToast('Film added to favourites');
    });

  }




  removeFromFavourites(film: Film) {
    this.favoriteService.deleteFilmFromFavorite(film).subscribe(response => {
      console.log('Film removed from favourites:', response);
      this.loadFavoriteFilms();
      this.showToast('Film removed from favourites');
    });

  }


  isAdded(film: Film): boolean {

    return this.favouriteFilms.some(favouriteFilm => favouriteFilm.id === film.id);
  }



  addToWatchlist(film: Film): void {
    this.watchlistService.addFilmToWatchList(film).subscribe(response => {
      console.log('Film added to watchlist:', response);
      this.loadWatchlistFilms();
      this.showToast('Film added to watchlist');
    });
  }

  isAddedWatchList(film: Film): boolean {

    return this.watchListFilms.some(watchListFilms => watchListFilms.id === film.id);


  }

  removeFromWatchList(film: Film) {
    this.watchlistService.deleteFilmFromWatchList(film).subscribe(response => {
      console.log('Film removed from watchlist:', response);
      this.loadWatchlistFilms();
      this.showToast('Film removed from watchlist');
    });

  }
  changePage(page: number): void {
    this.currentPage = page;
    if (this.watchListFilms.length > 0) {
      this.loadFilms();
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
