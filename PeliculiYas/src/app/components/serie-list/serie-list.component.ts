import { Component } from '@angular/core';
import { ListService } from '../../services/list.service';
import { Serie } from '../../models/serie.interface';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-serie-list',
  templateUrl: './serie-list.component.html',
  styleUrl: './serie-list.component.css'
})
export class SerieListComponent {

  listadoSeries: Serie[] = [];
  page: number = 1;
  favoriteSeries: Serie[] = [];

  

  constructor(private serieService: ListService, private favoriteService: FavoritesService) { }

  ngOnInit(): void {
    this.serieService.getPopularSeries().subscribe((response) => {
      this.listadoSeries = response.results;
    });
    this.favoriteService.getFavouriteSerie().subscribe(response => {
      this.favoriteSeries = response.results;
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
      console.log('Film added to favourites:', response);
    });
    window.location.reload();
  }

  removeFromFavourites(serie: Serie) {
    this.favoriteService.deleteSerieFromFavorite(serie).subscribe(response => {
      console.log('Film removed from favourites:', response);
    });
    window.location.reload();
  }


  isAdded(serie: Serie): boolean {

    return this.favoriteSeries.some(favouriteFilm => favouriteFilm.id === serie.id);


  }
}
