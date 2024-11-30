import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { Film } from '../../models/film.interface';
import { MisListasService } from '../../services/mis-listas.service';
import { myList, myListResponse } from '../../models/my-list.interface';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrl: './film-list.component.css'
})
export class FilmListComponent implements OnInit {
  misListas: myList[] = [];
  selectedListId: string = "";
  page = 1;
  listadoPeliculas: Film[] = [];

  constructor(private filmService : ListService, private myListService: MisListasService){};
  
  ngOnInit(): void {
    this.filmService.getPopularFilm().subscribe((response) =>
    {
      this.listadoPeliculas= response.results;
    })

    this.myListService.getListas().subscribe(response =>{
      this.misListas = response.results;
    })
  }

  getFullImagePath(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${posterPath}`;
  }

  getPaginaUno() {
    this.page = 1;
    this.filmService.getFilmPage(this.page).subscribe((response) => {
      this.listadoPeliculas = response.results;
    });
    }

  getNextPage() {
    this.page += 1;
    this.filmService.getFilmPage(this.page).subscribe((response) => {
      this.listadoPeliculas = response.results;
    });
  }

  getLastPage() {
    this.page -= 1;
    this.filmService.getFilmPage(this.page).subscribe((response) => {
      this.listadoPeliculas = response.results;
    });
  }

  getColor({ valoracion }: { valoracion: number }): { [key: string]: string } {
    return this.filmService.getColorValoracion({ valoracion });
  }

  getGenreNames(genreIds: number[]): string[] {
    return genreIds.map(id => this.filmService.getGenreName(id));
  }

  //Obtener el primer genero
  getFirstGenreName(genreIds: number[]): string {
    if (genreIds.length === 0) {
      return 'Unknown';
    }
    return this.filmService.getGenreName(genreIds[0]);
  }

  

}
