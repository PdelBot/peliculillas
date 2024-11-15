import { Component } from '@angular/core';
import { Film } from '../../models/film.interface';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-principal-menu',
  templateUrl: './principal-menu.component.html',
  styleUrl: './principal-menu.component.css'
})
export class PrincipalMenuComponent {

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
