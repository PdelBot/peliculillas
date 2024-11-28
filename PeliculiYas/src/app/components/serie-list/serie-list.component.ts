import { Component } from '@angular/core';
import { ListService } from '../../services/list.service';
import { Serie } from '../../models/serie.interface';

@Component({
  selector: 'app-serie-list',
  templateUrl: './serie-list.component.html',
  styleUrl: './serie-list.component.css'
})
export class SerieListComponent {

  listadoSeries: Serie[] = [];
  page: number = 1;

  constructor(private serieService: ListService) { }

  ngOnInit(): void {
    this.serieService.getPopularSeries().subscribe((response) => {
      this.listadoSeries = response.results;
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

  actualizarListado(nuevoListado: Serie[]) {
    this.listadoSeries = nuevoListado;
  }
}
