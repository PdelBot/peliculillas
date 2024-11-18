import { Component, OnInit } from '@angular/core';
import { Film } from '../../models/film.interface';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrl: './film-list.component.css'
})
export class FilmListComponent implements OnInit {

  listadoPeliculas: Film[] = [];
  num = 1;
  constructor(private filmService: ListService) { }

  ngOnInit(): void {
    this.filmService.getMovies().subscribe((response) => {
      this.listadoPeliculas = response.results;
    });
  }

  //Obtener la imagen
  getFullImagePath(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${posterPath}`;
  }

  //A lante y atras paginas
  getNextPage() {
    this.num += 1;
    this.listadoPeliculas = [];
    this.filmService.getFilmPage(this.num).subscribe((response) => {
      this.listadoPeliculas = response.results;
    });
  }
  getLastPage() {
    this.num -= 1;
    this.listadoPeliculas = [];
    this.filmService.getFilmPage(this.num).subscribe((response) => {
      this.listadoPeliculas = response.results;
    });
  }

  getOneGender() {
    let genero = 0;
    for (let i = 0; i < this.listadoPeliculas.length; i++) {
      genero = this.listadoPeliculas[i].genre_ids[0];
    }
    return genero;
  }
}
