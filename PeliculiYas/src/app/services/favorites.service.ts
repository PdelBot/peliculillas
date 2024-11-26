import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from '../models/film.interface';
import { environment } from '../../environments/environment';
import { FavoriteFilmResponse } from '../models/favorite-film-list.interface';
import { FavoriteSerieResponse } from '../models/favorite-serie.interface';
import { Serie } from '../models/serie.interface';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private http:HttpClient) { }
  addFilmToFavourites(film: Film): Observable<any> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
    const body = {
      media_id: film.id,
      media_type: 'movie',
      favorite: true
    };

    return this.http.post<any>(
      `${environment.apiBaseUrl}/account/${accountId}/favorite?api_key=${environment.apiKey}&session_id=${sessionId}`,
      body
    );

  }
  getFavouriteFilms(): Observable<FavoriteFilmResponse> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');

    return this.http.get<FavoriteFilmResponse>(
      `${environment.apiBaseUrl}/account/${accountId}/favorite/movies?api_key=${environment.apiKey}&session_id=${sessionId}`
    );
  }
  deleteFilmFromFavorite(film: Film): Observable<any> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
    const body = {
      media_id: film.id,
      media_type: 'movie',
      favorite: false
    };

    return this.http.post<any>(
      `${environment.apiBaseUrl}/account/${accountId}/favorite?api_key=${environment.apiKey}&session_id=${sessionId}`,
      body
    );

  }
  addSerieToFavourites(serie: Serie): Observable<any> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
    const body = {
      media_id: serie.id,
      media_type: 'tv',
      favorite: true
    };

    return this.http.post<any>(
      `${environment.apiBaseUrl}/account/${accountId}/favorite?api_key=${environment.apiKey}&session_id=${sessionId}`,
      body
    );

  }
  getFavouriteSerie(): Observable<FavoriteSerieResponse> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');

    return this.http.get<FavoriteSerieResponse>(
      `${environment.apiBaseUrl}/account/${accountId}/favorite/tv?api_key=${environment.apiKey}&session_id=${sessionId}`
    );
  }
  deleteSerieFromFavorite(serie: Serie): Observable<any> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
    const body = {
      media_id: serie.id,
      media_type: 'tv',
      favorite: false
    };

    return this.http.post<any>(
      `${environment.apiBaseUrl}/account/${accountId}/favorite?api_key=${environment.apiKey}&session_id=${sessionId}`,
      body
    );

  }
}
