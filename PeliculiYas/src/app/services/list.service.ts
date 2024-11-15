import { Injectable } from '@angular/core';
import { FilmListResponse } from '../models/film.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  getMovies(): Observable<FilmListResponse> {
    return this.http.get<FilmListResponse>('https://api.themoviedb.org/3/movie/popular', {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjA0YWMyNTA4ZmFmYTllN2Y5YjU0NDY1OGFjYjI1MCIsIm5iZiI6MTczMTY3Njk0NC43Mzg4MjcyLCJzdWIiOiI2NzMxYmRkNzYxNjI2YWMxMDZiZTY4MDMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.fE-T_bfqIFWaQZ3YjfPigPZFwtmGaCJ50Zf4dAnov4c'
      }
    });
  }

}
