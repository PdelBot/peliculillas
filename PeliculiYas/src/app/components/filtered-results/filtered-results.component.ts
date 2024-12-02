import { Component, OnInit } from '@angular/core';
import { Film } from '../../models/film.interface';
import { Serie } from '../../models/serie.interface';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-filtered-results',
  templateUrl: './filtered-results.component.html',
  styleUrl: './filtered-results.component.css'
})
export class FilteredResultsComponent implements OnInit{

  listadoPeliculas: Film[] = [];
  listadoSeries: Serie[] = [];
  tipo: 'peliculas' | 'series' = 'peliculas';
  generosSelecionados: number[] = [];
  sort: string = 'popularity.desc';

  constructor(private route: ActivatedRoute, private listService: ListService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.tipo = params['tipo'] || 'peliculas';
      this.generosSelecionados = params['generos'] ? params['generos'].split(',').map(Number) : [];
      this.sort = params['sort'] || 'popularity.desc';
      this.buscar();
    });
  }

  buscar() {
    if (this.tipo === 'peliculas') {
      this.listService.getAllFilteredFilms(this.sort, this.generosSelecionados).subscribe((data: Film[]) => {
        this.listadoPeliculas = data;
      });
    } else if (this.tipo === 'series') {
      this.listService.getAllFilteredSeries(this.sort, this.generosSelecionados).subscribe((data: Serie[]) => {
        this.listadoSeries = data;
      });
    }
  }
  getFullImagePath(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${posterPath}`;
  }
  getColor({ valoracion }: { valoracion: number }): { [key: string]: string } {
    return this.listService.getColorValoracion({ valoracion });
  }
}
