import { Injectable } from '@angular/core';
import { Film, FilmListResponse } from '../models/film.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SerieListResponse } from '../models/serie.interface';
import { ActorListResponse } from '../models/people.interface';

const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjA0YWMyNTA4ZmFmYTllN2Y5YjU0NDY1OGFjYjI1MCIsIm5iZiI6MTczMTY3Njk0NC43Mzg4MjcyLCJzdWIiOiI2NzMxYmRkNzYxNjI2YWMxMDZiZTY4MDMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.fE-T_bfqIFWaQZ3YjfPigPZFwtmGaCJ50Zf4dAnov4c'

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private genres: { [id: number]: string } = {};

  constructor(private http: HttpClient) {
    this.loadGenres();

  }

  // Peliculas en español y paginadas
  getFilm(): Observable<FilmListResponse> {
    return this.http.get<FilmListResponse>('https://api.themoviedb.org/3/movie/popular?language=es-US&page=1', {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      }
    });
  }

  getPopularFilm(): Observable<FilmListResponse> {
    return this.http.get<FilmListResponse>('https://api.themoviedb.org/3/movie/popular', {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      }
    });
  }

  getOneFilm(id: number): Observable<Film> {
    return this.http.get<Film>(`https://api.themoviedb.org/3/movie/${id}`, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      }
    })
  }

  // Series en español y paginadas

  getPopularSeries(): Observable<SerieListResponse> {
    return this.http.get<SerieListResponse>(`https://api.themoviedb.org/3/tv/popular?language=es-US&page=1`, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      }
    });
  }

  // Actores en español y paginadas

  getActors(): Observable<ActorListResponse> {
    return this.http.get<ActorListResponse>(`https://api.themoviedb.org/3/person/popular?language=es-US&page=1`, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      }
    });
  }


  //Para cambiar la pagina de las peliculas
  getFilmPage(page: number): Observable<FilmListResponse> {
    return this.http.get<FilmListResponse>(`https://api.themoviedb.org/3/movie/popular?language=es-US&page=${page}`, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      }
    });
  }

  //Para cambiar la pagina de las series

  getSeriesPage(page: number): Observable<SerieListResponse> {
    return this.http.get<SerieListResponse>(`https://api.themoviedb.org/3/tv/popular?language=es-US&page=${page}`, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      }
    });
  }

  //Para cambiar la pagina de los actores

  getActorPage(page: number): Observable<ActorListResponse> {
    return this.http.get<ActorListResponse>(`https://api.themoviedb.org/3/person/popular?language=es-US&page=${page}`, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      }
    });
  }


  //Obtener loss generos
  private loadGenres() {
    this.http.get<{ genres: { id: number, name: string }[] }>('https://api.themoviedb.org/3/genre/movie/list?language=es-US', {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      }
    }).subscribe(response => {
      response.genres.forEach(genre => {
        this.genres[genre.id] = genre.name;
      });
    });
  }
  //Obtener el nombre del genero
  getGenreName(id: number): string {
    return this.genres[id] || 'Unknown';
  }

  //Color segun la valoracion
  getColorValoracion({ valoracion }: { valoracion: number }): { [key: string]: string } {
    if (valoracion <= 4) {
      return { background: 'linear-gradient(-45deg, #ff0000 0%, #edad8f 100%)' };
    }
    if (valoracion > 4 && valoracion < 8) {
      return { background: 'linear-gradient(-45deg, #fc00ff 0%, #00dbde 100%)' };
    }
    return { background: 'linear-gradient(-45deg, #2bff00 0%, #00dbde 100%)' };
  }
}
