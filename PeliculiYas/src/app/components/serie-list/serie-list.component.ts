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
  num: number = 1;

  

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

  getNextPage() {
    this.num += 1;
    this.listadoSeries = [];
    this.serieService.getSeriesPage(this.num).subscribe((response) => {
      this.listadoSeries = response.results;
    });
  }
  getLastPage() {
    this.num -= 1;
    this.listadoSeries = [];
    this.serieService.getSeriesPage(this.num).subscribe((response) => {
      this.listadoSeries = response.results;
    });
  }

  getColor({ valoracion }: { valoracion: number }): { [key: string]: string } {
    return this.serieService.getColorValoracion({ valoracion });
  }
}
