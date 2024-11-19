import { Injectable } from '@angular/core';
import { FilmListResponse } from '../models/film.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Serie, SerieListResponse } from '../models/serie.interface';
import { ActorListResponse } from '../models/people.interface';

const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTFjNzJiOGRjZjIwODUzNjZiZTA1NjQyMGM1NDRlYiIsIm5iZiI6MTczMTY1NTkxNy40NDcwMDA1LCJzdWIiOiI2NzMxYmU1NmYzZWFmYzUyMDFmZDQwZmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UDXlx9oRksTdoLb88OtNZmqlJQ2w93zPCGAfxZVDuSU';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private genres: { [id: number]: string } = {};

  constructor(private http: HttpClient) {
    this.loadGenres();

   }

  getMovies(): Observable<FilmListResponse> {
    return this.http.get<FilmListResponse>('https://api.themoviedb.org/3/movie/popular?language=es-US&page=1', {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      }
    });
  }

  getSeries(): Observable<SerieListResponse> {
    return this.http.get<SerieListResponse>(`https://api.themoviedb.org/3/tv/popular?language=es-US&page=1`, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      }
    });
  }


  getActors(): Observable<ActorListResponse> {
    return this.http.get<ActorListResponse>(`https://api.themoviedb.org/3/person/popular?language=es-US&page=1`, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      }
    });
  }


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
}
