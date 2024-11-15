import { Injectable } from '@angular/core';
import { FilmListResponse } from '../models/film.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Serie, SerieListResponse } from '../models/serie.interface';

const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTFjNzJiOGRjZjIwODUzNjZiZTA1NjQyMGM1NDRlYiIsIm5iZiI6MTczMTY1NTkxNy40NDcwMDA1LCJzdWIiOiI2NzMxYmU1NmYzZWFmYzUyMDFmZDQwZmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UDXlx9oRksTdoLb88OtNZmqlJQ2w93zPCGAfxZVDuSU';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  getMovies(): Observable<FilmListResponse> {
    return this.http.get<FilmListResponse>('https://api.themoviedb.org/3/movie/popular', {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      }
    });
  }

  getSeries(): Observable<SerieListResponse> {
    return this.http.get<SerieListResponse>('https://api.themoviedb.org/3/tv/popular', {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      }
    });
  }

}
