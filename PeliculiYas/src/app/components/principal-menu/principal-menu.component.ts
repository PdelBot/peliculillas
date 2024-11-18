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
  peliculaMasPopular: Film | undefined

  constructor(private movieService: ListService) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((response) => {
      this.listadoPeliculas = response.results;

      this.movieService.getOneMovie(this.masPopular(this.listadoPeliculas)).subscribe((response) =>{
        this.peliculaMasPopular = response;
      });
      
    });

   
    
  }

  getFullImagePath(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${posterPath}`;
  }

  masPopular(lista: Film[]): number{
    var popularidad = 0;
    var id = 0;

    lista.forEach(film => {
      if(film.popularity > popularidad){
        popularidad = film.popularity;
        id = film.id
      }
    });

    return id;
  }

 

}
