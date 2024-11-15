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

  constructor(private movieService: ListService) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((response) => {
      this.listadoPeliculas = response.results;
    });
  }

  getFullImagePath(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${posterPath}`;
}
}
