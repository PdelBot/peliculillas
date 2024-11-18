import { Injectable } from '@angular/core';
import { Film, FilmListResponse } from '../models/film.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SerieListResponse } from '../models/serie.interface';

const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjA0YWMyNTA4ZmFmYTllN2Y5YjU0NDY1OGFjYjI1MCIsIm5iZiI6MTczMTY3Njk0NC43Mzg4MjcyLCJzdWIiOiI2NzMxYmRkNzYxNjI2YWMxMDZiZTY4MDMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.fE-T_bfqIFWaQZ3YjfPigPZFwtmGaCJ50Zf4dAnov4c'

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  //Obtener peliculas

  getMovies(): Observable<FilmListResponse> {
    return this.http.get<FilmListResponse>('https://api.themoviedb.org/3/movie/popular', {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      }
    });
  }

  getOneMovie (id:number): Observable<Film>{
    return this.http.get<Film>(`https://api.themoviedb.org/3/movie/${id}`, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      }
    })
  }

  //Obtener series

  getSeries(): Observable<SerieListResponse> {
    return this.http.get<SerieListResponse>(`https://api.themoviedb.org/3/tv/popular?language=es-US&page=1`, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      }
    });
  }

  //Listado de paginación

  getFilmPage(page: number): Observable<FilmListResponse> {
    return this.http.get<FilmListResponse>(`https://api.themoviedb.org/3/movie/popular?language=es-US&page=${page}`, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      }
    });
  }

  getSeriesPage(page: number): Observable<SerieListResponse> {
    return this.http.get<SerieListResponse>(`https://api.themoviedb.org/3/tv/popular?language=es-US&page=${page}`, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      }
    });
  }

}
