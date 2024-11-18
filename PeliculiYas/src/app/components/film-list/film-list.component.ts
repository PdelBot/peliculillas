import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { Film } from '../../models/film.interface';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrl: './film-list.component.css'
})
export class FilmListComponent implements OnInit {

  num = 1;
  listadoPeliculas: Film[] = [];

  constructor(private movieService : ListService){};
  
  ngOnInit(): void {
    this.movieService.getPopularMovies().subscribe((response) =>
    {
      this.listadoPeliculas= response.results;
    })
  }

  getFullImagePath(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${posterPath}`;
  }

  getNextPage() {
    this.num += 1;
    this.listadoPeliculas = [];
    this.movieService.getFilmPage(this.num).subscribe((response) => {
      this.listadoPeliculas = response.results;
    });
  }

  getLastPage() {
    this.num -= 1;
    this.listadoPeliculas = [];
    this.movieService.getFilmPage(this.num).subscribe((response) => {
      this.listadoPeliculas = response.results;
    });
  }

  getColor({ valoracion }: { valoracion: number }): { [key: string]: string } {
    return this.movieService.getColorValoracion({ valoracion });
  }

}
