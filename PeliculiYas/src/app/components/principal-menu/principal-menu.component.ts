import { Component } from '@angular/core';
import { Film } from '../../models/film.interface';
import { ListService } from '../../services/list.service';
import { Serie } from '../../models/serie.interface';
import { DetailsService } from '../../services/details.service';
import { FilmDetailsResponse, Genre } from '../../models/film-details.interface';

@Component({
  selector: 'app-principal-menu',
  templateUrl: './principal-menu.component.html',
  styleUrl: './principal-menu.component.css'
})
export class PrincipalMenuComponent {

  
  listadoPeliculas: Film[] = [];
  peliculaMasPopular: FilmDetailsResponse | undefined
  listadoSeries: Serie[] = [];

  constructor(private filmService: ListService, private detailService: DetailsService) { }

  ngOnInit(): void {
    this.filmService.getPopularFilm().subscribe((response) => {
      this.listadoPeliculas = response.results;

      this.detailService.getFilmdeatils(this.masPopular(this.listadoPeliculas)).subscribe((response) =>{
        this.peliculaMasPopular = response;
      })
      

      this.filmService.getPopularSeries().subscribe((response) => {
        this.listadoSeries = response.results;
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
 
  generoPrimera(genres: Genre[] | null | undefined): string {
    // Verifica que el arreglo no sea null, undefined y tenga al menos un elemento.
    if (genres && genres.length > 0) {
      return genres[0].name;
    }
  
    // Devuelve un valor predeterminado si no es posible obtener el género.
    return 'Género no disponible';
  }
  



}
