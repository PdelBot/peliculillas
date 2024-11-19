import { Component } from '@angular/core';
import { Film } from '../../models/film.interface';
import { ListService } from '../../services/list.service';
import { Serie } from '../../models/serie.interface';

@Component({
  selector: 'app-principal-menu',
  templateUrl: './principal-menu.component.html',
  styleUrl: './principal-menu.component.css'
})
export class PrincipalMenuComponent {
  listadoPeliculas: Film[] = [];
  peliculaMasPopular: Film | undefined

  listadoSeries: Serie[] = [];

  constructor(private movieService: ListService) { }

  ngOnInit(): void {
    this.movieService.getPopularFilm().subscribe((response) => {
      this.listadoPeliculas = response.results;

      this.movieService.getOneFilm(this.masPopular(this.listadoPeliculas)).subscribe((response) => {
        this.peliculaMasPopular = response;
      });

      this.movieService.getPopularSeries().subscribe((response) => {
        this.listadoSeries = response.results;
      });

    });



  }

  getFullImagePath(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${posterPath}`;
  }

  masPopular(lista: Film[]): number {
    var popularidad = 0;
    var id = 0;

    lista.forEach(film => {
      if (film.popularity > popularidad) {
        popularidad = film.popularity;
        id = film.id
      }
    });

    return id;
  }

  getColor({ valoracion }: { valoracion: number }): { [key: string]: string } {
    return this.movieService.getColorValoracion({ valoracion });
  }

  getGenreNames(genreIds: number[]): string[] {
    return genreIds.map(id => this.movieService.getGenreName(id));
  }

  //Obtener el primer genero
  getFirstGenreName(genreIds: number[]): string {
    if (genreIds.length === 0) {
      return 'Unknown';
    }
    return this.movieService.getGenreName(genreIds[0]);
  }
}
