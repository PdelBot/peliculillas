import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { Film } from '../../models/film.interface';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrl: './film-list.component.css'
})
export class FilmListComponent implements OnInit {



  page = 1;
  listadoPeliculas: Film[] = [];
  favouriteFilms: Film[] = [];


  constructor(private filmService: ListService, private favoriteService: FavoritesService) { };

  ngOnInit(): void {
    this.filmService.getPopularFilm().subscribe((response) => {
      this.listadoPeliculas = response.results;
    })

    this.favoriteService.getFavouriteFilms().subscribe(response => {
      this.favouriteFilms = response.results;
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
    this.favoriteService.addFilmToFavourites(film).subscribe(response => {
      console.log('Film added to favourites:', response);
    });
    window.location.reload();
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

  toggleFavourite(peli: any): void {
    if (this.isAdded(peli)) {
      this.removeFromFavourites(peli);
    } else {
      this.addToFavourites(peli);
    }
  }



}
