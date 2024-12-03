import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DetailsService } from '../../services/details.service';
import { FilmDetailsResponse } from '../../models/film-details.interface';
import { Cast, Crew } from '../../models/film-credits.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TrailerDetailsResponse } from '../../models/trailer-details.interface';
import { ActivatedRoute } from '@angular/router';
import { myList, myListResponse } from '../../models/my-list.interface';
import { MisListasService } from '../../services/mis-listas.service';
import { Film } from '../../models/film.interface';
import { FavoritesService } from '../../services/favorites.service';
import { WatchListService } from '../../services/watch-list.service';
import { RatingService } from '../../services/rating.service';
import * as bootstrap from 'bootstrap';




@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrl: './film-details.component.css'
})
export class FilmDetailsComponent implements OnInit {

  add: boolean = false;
  trailerUrl: SafeResourceUrl | null = null;
  checkedLists: { [key: number]: boolean } = {};
  listas: myList[] = [];
  trailer: TrailerDetailsResponse | undefined;
  film: FilmDetailsResponse | undefined;
  listCast: Cast[] = [];
  listCrew: Crew[] = [];
  rating: number = 0;
  check: boolean = false;
  type: string = "";
  favoriteFilms: Film[] = [];
  watchListFilms: Film[] = [];
  filmWatchList: Film | undefined;
  filmFavorite: Film | undefined;
  currentPage: number = 1;
  filmDetail: Film | undefined;
  userRating: number = 0;  
  addItem: boolean = true;


  constructor(
    private detailsService: DetailsService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private favoriteService: FavoritesService,
    private watchListService: WatchListService,
    private myListService: MisListasService,
    private ratingService: RatingService
  ) { }

  ngOnInit(): void {
    const filmId = this.route.snapshot.paramMap.get('id');
    

    this.type = this.route.snapshot.url[0].path;
    if (this.type === "peliculas"){
      this.type = "movie"
    }
    console.log(this.type)    

    if (filmId) {
      this.detailsService.getFilmdeatils(+filmId).subscribe((response) => {
        this.film = response;

      });

      this.detailsService.getFilmdeatils(+filmId).subscribe(data => {
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
          this.detailsService.getFilmdeatils(+filmId).subscribe(englishData => {
            this.film = englishData;
          });
        }
      });

      this.detailsService.getFilmCredits(+filmId).subscribe(filmCreditsCast => {
        this.listCast = filmCreditsCast.cast;
      });


      this.myListService.getListas().subscribe(response => {
        this.listas = response.results;

        this.listas.forEach((list) => {
          this.myListService.getDetailsList(list.id.toString()).subscribe((response) => {
            const isInList = response.items.some((item: any) => item.id === this.film!.id);
            this.checkedLists[list.id] = isInList;
          });
        });
      })

      


      this.loadFilmDetails(+filmId);
      this.loadFavouriteFilms();
      this.loadAllWatchListFilms();

    this.ratingService.getUserRating(+filmId).subscribe({
      next: (response) => {
        this.userRating = response.rated?.value || 0; 
      },
      error: (err) => console.error('Error al obtener la calificación del usuario:', err),
    });
  
    }



  }
  isLoggedIn() {
    return localStorage.getItem('logged_in') === 'true';
  }
  logout() {
    localStorage.clear();
    window.location.href = 'http://localhost:4200';
  }

  loadFilmDetails(id: number): void {
    this.detailsService.getFilmdeatils(id).subscribe(response => {
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

  addToFavourites(film: Film): void {
    this.favoriteService.addFilmToFavourites(film).subscribe(response => {
      console.log('Serie añadida a la lista de seguimiento:', response);
      this.loadFavouriteFilms(); // Actualizar la lista de seguimiento
      this.showToast('Serie añadida a favoritos');
    });
  }


  removeFromFavourites(film: Film) {
    this.favoriteService.deleteFilmFromFavorite(film).subscribe(response => {
      console.log('Film removed from favourites:', response);
      this.loadFavouriteFilms();
      this.showToast('Serie eliminada de favoritos');
    });
  }

  onCheckboxChange(event: Event, listId: number): void {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.checked) {
      this.myListService.add(this.film!.id, listId, this.type).subscribe(() => {
        console.log(`Película añadida a la lista ${listId}`);
        this.showToast('Película añadida a la lista');
        this.checkedLists[listId] = true; // Actualiza el estado local
      });
    } else{
      this.myListService.delete(this.film!.id, listId, this.type).subscribe(() => {
        console.log(`Película eliminada de la lista ${listId}`);
        this.showToast('Película eliminada de la lista');
        this.checkedLists[listId] = false; // Actualiza el estado local
      });
    }
  }
  
  onAdd() {
    if(!this.add){
      this.add = true;
    }else{
      this.add = false;
    }
  }

  isAdded(film: Film): boolean {

    return this.favoriteFilms.some(favouriteFilm => favouriteFilm.id === film.id);
  }

  addToWatchlist(film: Film): void {
    this.watchListService.addFilmToWatchList(film).subscribe(response => {
      console.log('Serie añadida a la lista de seguimiento:', response);
      this.loadAllWatchListFilms(); // Actualizar la lista de seguimiento
      this.showToast('Serie añadida a lsita de seguimiento');
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
    this.showToast('Serie eliminada de la lista de seguimiento');
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

  saveRating(newRating: number): void {
    if (this.film) {
      this.ratingService.saveRating(this.film.id, newRating).subscribe({
        next: () => {
          this.userRating = newRating; // Actualizamos la calificación actual en la vista
          console.log(`Calificación de ${newRating} guardada exitosamente en TMDb`);
        },
        error: (err) => console.error('Error al guardar la calificación en TMDb:', err),
      });
    }
  }

  deleteRating(): void {
    if (this.film) {
      this.ratingService.deleteRating(this.film.id).subscribe({
        next: () => {
          this.userRating = 0; // Actualizamos la calificación actual en la vista
          console.log('Calificación eliminada exitosamente de TMDb');
        },
        error: (err) => console.error('Error al eliminar la calificación en TMDb:', err),
      });
    }
  }
}

