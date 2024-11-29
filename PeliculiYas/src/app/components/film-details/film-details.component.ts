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


    }
    this.favoriteService.getFavouriteFilms().subscribe(response => {
      this.favoriteFilms = response.results;
    });
    this.watchListService.getWatchListFilms().subscribe(response => {
      this.watchListFilms = response.results;
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

  addToFavourites(): void {
    if (this.favoriteFilms.length < 20) {
      if (this.filmFavorite) {
        this.favoriteService.addFilmToFavourites(this.filmFavorite).subscribe(response => {
          console.log('Film added to favourites:', response);
        });
      }
    } else {
      alert('You have reached the maximum number of movies in your favorites list. Please remove a movie before adding a new one.');
    }
  }


  removeFromFavourites() {
    if (this.filmFavorite) {
      this.favoriteService.deleteFilmFromFavorite(this.filmFavorite).subscribe(response => {
        console.log('Film added to favourites:', response);
      });
      window.location.reload();
    }
  }


  isAdded(): boolean {

    if (this.filmFavorite) {
      return this.favoriteFilms.some(watchListFilmsDe => watchListFilmsDe.id === this.filmFavorite?.id);

    } else {
      return false;
    }
  }

  addToWatchlist(): void {
    if (this.watchListFilms.length < 20) {

      if (this.filmWatchList) {
        this.watchListService.addFilmToWatchList(this.filmWatchList).subscribe(response => {
          console.log('Film added to watchlist:', response);
        });
        window.location.reload();
      }
    } else {
      alert('You have reached the maximum number of movies in your watchlist. Please remove a movie before adding a new one.');
    }
  }

  isAddedWatchList(): boolean {

    if (this.filmWatchList) {
      return this.watchListFilms.some(watchListFilmsDe => watchListFilmsDe.id === this.filmWatchList?.id);

    } else {
      return false;
    }
  }

  removeFromWatchList(): void {
    if (this.filmWatchList) {
      this.watchListService.deleteFilmFromWatchList(this.filmWatchList).subscribe(response => {
        console.log('Film removed from watchlist:', response);
      });
      window.location.reload();
    }
  }



}

