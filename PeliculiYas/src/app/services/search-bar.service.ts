import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from '../models/film.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {

  constructor(private http: HttpClient) { }

  filterMovie(name: string): Observable<Film> {
    return this.http.get<Film>(`https://api.themoviedb.org/3/search/movie?query=${name}&api_key=API_KEY`);
  }
}
