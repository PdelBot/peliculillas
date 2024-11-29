import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { Film } from '../../models/film.interface';
import { FavoritesService } from '../../services/favorites.service';
import { WatchListService } from '../../services/watch-list.service';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrl: './film-list.component.css'
})
export class FilmListComponent implements OnInit {

  page = 1;
  listadoPeliculas: Film[] = [];
  favouriteFilms: Film[] = [];
  watchListFilms: Film[] = [];


  constructor(private filmService: ListService, private favoriteService: FavoritesService, private watchlistService: WatchListService) { };

  ngOnInit(): void {
    this.filmService.getPopularFilm().subscribe((response) => {
      this.listadoPeliculas = response.results;
    })

    this.favoriteService.getFavouriteFilms().subscribe(response => {
      this.favouriteFilms = response.results;
    });

    this.watchlistService.getWatchListFilms().subscribe(response => {
      this.watchListFilms = response.results;
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


  addToFavourites(film: Film): void {
    if (this.favouriteFilms.length < 20) {
      this.favoriteService.addFilmToFavourites(film).subscribe(filmAdded => {
        console.log('Film added to favourites:', filmAdded);
      });
      window.location.reload();
    } else {
      alert('You have reached the maximum number of movies in your favorites list. Please remove a movie before adding a new one.');
    }

  }




  removeFromFavourites(film: Film) {
    this.favoriteService.deleteFilmFromFavorite(film).subscribe(response => {
      console.log('Film removed from favourites:', response);
    });
    window.location.reload();

  }


  isAdded(film: Film): boolean {

    return this.favouriteFilms.some(favouriteFilm => favouriteFilm.id === film.id);


  }



  addToWatchlist(film: Film): void {
    if (this.watchListFilms.length < 20) {
      this.watchlistService.addFilmToWatchList(film).subscribe(response => {
        console.log('Film added to watchlist:', response);
      });
      window.location.reload();
    } else {
      alert('You have reached the maximum number of movies in your watchlist. Please remove a movie before adding a new one.');
    }
  }

  isAddedWatchList(film: Film): boolean {

    return this.watchListFilms.some(watchListFilms => watchListFilms.id === film.id);


  }

  removeFromWatchList(film: Film) {
    this.watchlistService.deleteFilmFromWatchList(film).subscribe(response => {
      console.log('Film removed from watchlist:', response);
    });
    window.location.reload();
  }


}
