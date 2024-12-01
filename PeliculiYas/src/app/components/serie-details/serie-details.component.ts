import { Component, OnInit } from '@angular/core';
import { DetailsService } from '../../services/details.service';
import { Season, SerieDetaisResponse } from '../../models/series-details.interface';
import { SeasonDetailsResponse } from '../../models/season-details.interface';
import { ActivatedRoute } from '@angular/router';
import { WatchListService } from '../../services/watch-list.service';
import { FavoritesService } from '../../services/favorites.service';
import { Serie } from '../../models/serie.interface';
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'app-serie-details',
  templateUrl: './serie-details.component.html',
  styleUrl: './serie-details.component.css'
})
export class SerieDetailsComponent implements OnInit {

  seriesDetails: SerieDetaisResponse | undefined;
  seasonsId: Season[] = [];
  seasons: SeasonDetailsResponse[] = [];
  selectedSeason: SeasonDetailsResponse | undefined;
  rating: number = 0;
  favoriteSeries: Serie[] = [];
  watchListSeries: Serie[] = [];
  serieWatchList: Serie | undefined;
  serieFavorite: Serie | undefined;
  currentPage: number = 1;
  seriesDetail: Serie | undefined;



  constructor(private detailsService: DetailsService, private route: ActivatedRoute, private watchListService: WatchListService, private favoriteService: FavoritesService) { }

  ngOnInit(): void {
    const serieId = this.route.snapshot.paramMap.get('id');
    if (serieId) {
      this.detailsService.getSeriesDetails(+serieId, 'es-ES').subscribe((response) => {
        this.seriesDetails = response;

      });



      this.detailsService.getSeriesDetails(+serieId, 'es-ES').subscribe(data => {
        if (data) {
          this.seriesDetails = data;
          this.serieWatchList = {
            name: data.name,
            overview: data.overview,
            poster_path: data.poster_path,
            adult: data.adult,
            backdrop_path: data.backdrop_path,
            genre_ids: data.genres.map(genre => genre.id),
            id: data.id,
            origin_country: data.origin_country,
            original_language: data.original_language,
            original_name: data.original_name,
            popularity: data.popularity,
            first_air_date: data.first_air_date,
            vote_average: data.vote_average,
            vote_count: data.vote_count,
          };
          this.serieFavorite = {
            name: data.name,
            overview: data.overview,
            poster_path: data.poster_path,
            adult: data.adult,
            backdrop_path: data.backdrop_path,
            genre_ids: data.genres.map(genre => genre.id),
            id: data.id,
            origin_country: data.origin_country,
            original_language: data.original_language,
            original_name: data.original_name,
            popularity: data.popularity,
            first_air_date: data.first_air_date,
            vote_average: data.vote_average,
            vote_count: data.vote_count,
          };


          this.seasonsId = data.seasons;
          this.loadSeasons(+serieId, this.seasonsId);
          this.rating = (this.seriesDetails.vote_average || 0) / 2;
        } else {
          this.detailsService.getSeriesDetails(+serieId, 'en-US').subscribe(englishData => {
            this.seriesDetails = englishData;
            this.seasonsId = englishData.seasons;
            this.loadSeasons(+serieId, this.seasonsId);
          });
        }
      });

      this.loadSerieDetails(+serieId);
      this.loadAllWatchListSeries();
      this.loadFavouriteSeries();
    }

  }
  isLoggedIn() {
    return localStorage.getItem('logged_in') === 'true';
  }
  logout() {
    localStorage.clear();
    window.location.href = 'http://localhost:4200';
  }
  loadSerieDetails(id: number): void {
    this.detailsService.getSeriesDetails(id, 'es-ES').subscribe(response => {
      this.seriesDetails = response;
      console.log('Series details loaded:', this.seriesDetails);
    });
  }

  loadFavouriteSeries(): void {
    this.favoriteService.getAllFavoriteSeries().subscribe(response => {
      this.favoriteSeries = response;
      console.log('Series favoritas cargadas:', this.favoriteSeries);
    });
  }

  loadAllWatchListSeries(): void {
    this.watchListService.getAllWatchListSeries().subscribe(response => {
      this.watchListSeries = response;
      console.log('Series en la lista de seguimiento cargadas:', this.watchListSeries);
    });
  }

  loadSeasons(serieId: number, seasons: Season[]): void {
    seasons.forEach(season => {
      this.detailsService.getSeasonDetails(serieId, season.season_number, 'es-ES').subscribe(data => {
        this.seasons.push(data);
      });
    });
  }

  selectSeason(event: Event, season: SeasonDetailsResponse): void {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
    this.selectedSeason = season;
  }

  getImgUrl(path: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${path}`;
  }

  addToFavourites(serie: Serie): void {
    this.favoriteService.addSerieToFavourites(serie).subscribe(response => {
      console.log('Serie añadida a la lista de seguimiento:', response);
      this.loadFavouriteSeries(); // Actualizar la lista de seguimiento
    });
    this.showToast('Serie añadida a favoritos');
  }

  removeFromFavourites(serie: Serie): void {

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
    this.watchListService.addSerieToWatchList(serie).subscribe(response => {
      console.log('Serie añadida a la lista de seguimiento:', response);
      this.loadAllWatchListSeries(); // Actualizar la lista de seguimiento
    });
    this.showToast('Serie añadida a la lista de seguimiento');
  }
  removeFromWatchList(serie: Serie): void {
    this.watchListService.deleteSerieFromWatchList(serie).subscribe(response => {
      console.log('Serie eliminada de la lista de seguimiento:', response);
      this.loadAllWatchListSeries(); // Actualizar la lista de seguimiento
    });
    this.showToast('Serie eliminada de la lista de seguimiento');
  }

  isAddedWatchList(serie: Serie): boolean {
    return this.watchListSeries.some(watchListSeries => watchListSeries.id === serie.id);
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
