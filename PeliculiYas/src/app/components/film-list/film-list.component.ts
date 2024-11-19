import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { Film } from '../../models/film.interface';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrl: './film-list.component.css'
})
export class FilmListComponent implements OnInit {

  page = 1;
  listadoPeliculas: Film[] = [];

  constructor(private movieService: ListService) { };

  ngOnInit(): void {
    this.movieService.getPopularFilm().subscribe((response) => {
      this.listadoPeliculas = response.results;
    })
  }

  getFullImagePath(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${posterPath}`;
  }

  getNextPage() {
    this.page += 1;
    this.listadoPeliculas = [];
    this.movieService.getFilmPage(this.page).subscribe((response) => {
      this.listadoPeliculas = response.results;
    });
  }

  getLastPage() {
    this.page -= 1;
    this.listadoPeliculas = [];
    this.movieService.getFilmPage(this.page).subscribe((response) => {
      this.listadoPeliculas = response.results;
    });
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
