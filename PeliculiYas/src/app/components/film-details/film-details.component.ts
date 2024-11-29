import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DetailsService } from '../../services/details.service';
import { FilmDetailsResponse } from '../../models/film-details.interface';
import { Cast, Crew } from '../../models/film-credits.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TrailerDetailsResponse } from '../../models/trailer-details.interface';
import { ActivatedRoute } from '@angular/router';
import { Film } from '../../models/film.interface';
import { FavoritesService } from '../../services/favorites.service';
import { WatchListService } from '../../services/watch-list.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrl: './film-details.component.css'
})
export class FilmDetailsComponent implements OnInit {
  trailerUrl: SafeResourceUrl | null = null;


  trailer: TrailerDetailsResponse | undefined;
  film: FilmDetailsResponse | undefined;
  listCast: Cast[] = [];
  listCrew: Crew[] = [];
  rating: number = 0;
  favoriteFilms: Film[] = [];
  watchListFilms: Film[] = [];
  filmWatchList: Film | undefined;
  filmFavorite: Film | undefined;
  currentPage: number = 1;
  filmDetail: Film | undefined;


  constructor(
    private detailsService: DetailsService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private favoriteService: FavoritesService,
    private watchListService: WatchListService
  ) { }

  ngOnInit(): void {
    const filmId = this.route.snapshot.paramMap.get('id');

    if (filmId) {
      this.detailsService.getFilmdeatils(+filmId, 'es-ES').subscribe((response) => {
        this.film = response;

      });

      this.detailsService.getFilmdeatils(+filmId, 'es-ES').subscribe(data => {
        if (data) {
          this.film = data;
          this.rating = (this.film.vote_average || 0) / 2;
          this.filmWatchList = {
            adult: data.adult,
            backdrop_path: data.backdrop_path,
            genre_ids: data.genres.map(genre => genre.id),
            id: data.id,
            original_language: data.original_language,
            original_title: data.original_title,
            overview: data.overview,
            popularity: data.popularity,
            poster_path: data.poster_path,
            release_date: data.release_date,
            title: data.title,
            video: data.video,
            vote_average: data.vote_average,
            vote_count: data.vote_count,
          };
          this.filmFavorite = {
            adult: data.adult,
            backdrop_path: data.backdrop_path,
            genre_ids: data.genres.map(genre => genre.id),
            id: data.id,
            original_language: data.original_language,
            original_title: data.original_title,
            overview: data.overview,
            popularity: data.popularity,
            poster_path: data.poster_path,
            release_date: data.release_date,
            title: data.title,
            video: data.video,
            vote_average: data.vote_average,
            vote_count: data.vote_count,
          };
        } else {
          this.detailsService.getFilmdeatils(+filmId, 'en-US').subscribe(englishData => {
            this.film = englishData;
          });
        }
      });

      this.detailsService.getFilmCredits(+filmId).subscribe(filmCreditsCast => {
        this.listCast = filmCreditsCast.cast;


      });

      this.loadFilmDetails(+filmId);
      this.loadFavouriteFilms();
      this.loadAllWatchListFilms();
    }



  }

  loadFilmDetails(id: number): void {
    this.detailsService.getFilmdeatils(id, 'es-ES').subscribe(response => {
      this.film = response;
    });
  }
  loadFavouriteFilms(): void {
    this.favoriteService.getAllFavoriteFilms().subscribe(response => {
      this.favoriteFilms = response;
      console.log('Series favoritas cargadas:', this.favoriteFilms);
    });
  }

  loadAllWatchListFilms(): void {
    this.watchListService.getAllWatchListFilms().subscribe(response => {
      this.watchListFilms = response;
      console.log('Series en la lista de seguimiento cargadas:', this.watchListFilms);
    });
  }


  watchTrailer() {
    this.detailsService.getTrailer(this.film!.id | 0).subscribe(data => {
      if (data.results.length > 0) {
        const lastTrailer = data.results[data.results.length - 1];
        const youtubeUrl = `https://www.youtube.com/embed/${lastTrailer.key}`;
        this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(youtubeUrl);
        window.open(youtubeUrl, '_blank');

        console.log(this.trailerUrl);
      } else {
        this.trailerUrl = null;
      }
    });
  }


  getImgUrl(path: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${path}`;
  }

  addToFavourites(film: Film ): void {
    this.favoriteService.addFilmToFavourites(film).subscribe(response => {
      console.log('Serie añadida a la lista de seguimiento:', response);
      this.loadFavouriteFilms(); // Actualizar la lista de seguimiento
    });
  }


  removeFromFavourites(film : Film) {
    this.favoriteService.deleteFilmFromFavorite(film).subscribe(response => {
      console.log('Film removed from favourites:', response);
      this.loadFavouriteFilms();
    });
  }


  isAdded(film: Film): boolean {

    return this.favoriteFilms.some(favouriteFilm => favouriteFilm.id === film.id);
  }

  addToWatchlist(film: Film): void {
    this.watchListService.addFilmToWatchList(film).subscribe(response => {
      console.log('Serie añadida a la lista de seguimiento:', response);
      this.loadAllWatchListFilms(); // Actualizar la lista de seguimiento
    });
  }


  isAddedWatchList(film: Film): boolean {
    return this.watchListFilms.some(watchListSeries => watchListSeries.id === film.id);
  }

  removeFromWatchList(film: Film): void {
    this.watchListService.deleteFilmFromWatchList(film).subscribe(response => {
      console.log('Serie eliminada de la lista de seguimiento:', response);
      this.loadAllWatchListFilms(); // Actualizar la lista de seguimiento
    });
  }



}

