import { Component, OnInit } from '@angular/core';
import { DetailsService } from '../../services/details.service';
import { Season, SerieDetaisResponse } from '../../models/series-details.interface';
import { SeasonDetailsResponse } from '../../models/season-details.interface';
import { ActivatedRoute } from '@angular/router';
import { WatchListService } from '../../services/watch-list.service';
import { FavoritesService } from '../../services/favorites.service';
import { Serie } from '../../models/serie.interface';

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
    }
    this.favoriteService.getFavouriteSerie().subscribe(response => {
      this.favoriteSeries = response.results;
    });
    this.watchListService.getWatchListSeries().subscribe(response => {
      this.watchListSeries = response.results;
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

  addToFavourites(): void {
    if (this.serieFavorite) {
      this.favoriteService.addSerieToFavourites(this.serieFavorite).subscribe(response => {
        console.log('Film added to favourites:', response);
      });
      window.location.reload();
    }
  }

  removeFromFavourites() {
    if (this.serieFavorite) {
      this.favoriteService.deleteSerieFromFavorite(this.serieFavorite).subscribe(response => {
        console.log('Film added to favourites:', response);
      });
      window.location.reload();
    }
  }


  isAdded(): boolean {

    if (this.serieFavorite) {
      return this.favoriteSeries.some(watchListSeriesDe => watchListSeriesDe.id === this.serieFavorite?.id);

    } else {
      return false;
    }
  }

  addToWatchlist(): void {
    if (this.serieWatchList) {
      this.watchListService.addSerieToWatchList(this.serieWatchList).subscribe(response => {
        console.log('Film added to watchlist:', response);
      });
      window.location.reload();
    }
  }

  isAddedWatchList(): boolean {

    if (this.serieWatchList) {
      return this.watchListSeries.some(watchListSeriesDe => watchListSeriesDe.id === this.serieWatchList?.id);

    } else {
      return false;
    }
  }

  removeFromWatchList(): void {
    if (this.serieWatchList) {
      this.watchListService.deleteSerieFromWatchList(this.serieWatchList).subscribe(response => {
        console.log('Film removed from watchlist:', response);
      });
      window.location.reload();
    }
  }


}
