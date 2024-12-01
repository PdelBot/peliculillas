import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Film } from '../models/film.interface';
import { environment } from '../../environments/environment';
import { FavoriteFilmResponse } from '../models/favorite-film-list.interface';
import { FavoriteSerieResponse } from '../models/favorite-serie.interface';
import { Serie } from '../models/serie.interface';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private http: HttpClient) { }

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
  getFavouriteFilms(page: number): Observable<FavoriteFilmResponse> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');

    return this.http.get<FavoriteFilmResponse>(
      `${environment.apiBaseUrl}/account/${accountId}/favorite/movies?api_key=${environment.apiKey}&session_id=${sessionId}&page=${page}`
    );
  }
  getAllFavoriteFilms(): Observable<Film[]> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
    return this.http.get<FavoriteFilmResponse>(
      `${environment.apiBaseUrl}/account/${accountId}/favorite/movies?api_key=${environment.apiKey}&session_id=${sessionId}`
    ).pipe(
      map((response: { total_pages: any; }) => {
        const totalPages = response.total_pages;
        const requests: Observable<FavoriteFilmResponse>[] = [];
        for (let page = 1; page <= totalPages; page++) {
          requests.push(this.getFavouriteFilms(page));
        }
        return forkJoin(requests).pipe(
          map((responses: any[]) => {
            return responses.reduce((acc, res) => acc.concat(res.results), []);
          })
        );
      }),
      switchMap(obs => obs)
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
  getFavoriteSeries(page: number): Observable<FavoriteSerieResponse> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');

    return this.http.get<FavoriteSerieResponse>(
      `${environment.apiBaseUrl}/account/${accountId}/favorite/tv?api_key=${environment.apiKey}&session_id=${sessionId}&page=${page}`
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

  getAllFavoriteSeries(): Observable<Serie[]> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
    return this.http.get<FavoriteSerieResponse>(
      `${environment.apiBaseUrl}/account/${accountId}/favorite/tv?api_key=${environment.apiKey}&session_id=${sessionId}`
    ).pipe(
      map((response: { total_pages: any; }) => {
        const totalPages = response.total_pages;
        const requests: Observable<FavoriteSerieResponse>[] = [];
        for (let page = 1; page <= totalPages; page++) {
          requests.push(this.getFavoriteSeries(page));
        }
        return forkJoin(requests).pipe(
          map((responses: any[]) => {
            return responses.reduce((acc, res) => acc.concat(res.results), []);
          })
        );
      }),
      switchMap(obs => obs)
    );
  }

}
