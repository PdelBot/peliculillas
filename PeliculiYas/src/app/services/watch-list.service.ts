import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Film } from '../models/film.interface';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { WatchListFilmResponse } from '../models/watchlist-film.interface';
import { Serie } from '../models/serie.interface';
import { WatchListSeriesResponse } from '../models/watchlist-serie.interface';

@Injectable({
  providedIn: 'root'
})
export class WatchListService {
  addSeriesToWatchList(serie: Serie) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  addFilmToWatchList(film: Film): Observable<any> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
    const body = {
      media_id: film.id,
      media_type: 'movie',
      watchlist: true
    };

    return this.http.post<any>(
      `${environment.apiBaseUrl}/account/${accountId}/watchlist?api_key=${environment.apiKey}&session_id=${sessionId}`,
      body
    );

  }
  getWatchListFilms(page: number): Observable<WatchListFilmResponse> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');

    return this.http.get<WatchListFilmResponse>(
      `${environment.apiBaseUrl}/account/${accountId}/watchlist/movies?api_key=${environment.apiKey}&session_id=${sessionId}&page=${page}`
    );
  }
  getAllWatchListFilms(): Observable<Film[]> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
    return this.http.get<WatchListFilmResponse>(
      `${environment.apiBaseUrl}/account/${accountId}/watchlist/movies?api_key=${environment.apiKey}&session_id=${sessionId}`
    ).pipe(
      map((response: { total_pages: any; }) => {
        const totalPages = response.total_pages;
        const requests: Observable<WatchListFilmResponse>[] = [];
        for (let page = 1; page <= totalPages; page++) {
          requests.push(this.getWatchListFilms(page));
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
  deleteFilmFromWatchList(film: Film): Observable<any> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
    const body = {
      media_id: film.id,
      media_type: 'movie',
      watchlist: false
    };

    return this.http.post<any>(
      `${environment.apiBaseUrl}/account/${accountId}/watchlist?api_key=${environment.apiKey}&session_id=${sessionId}`,
      body
    );

  }
  addSerieToWatchList(serie: Serie): Observable<any> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
    const body = {
      media_id: serie.id,
      media_type: 'tv',
      watchlist: true
    };

    return this.http.post<any>(
      `${environment.apiBaseUrl}/account/${accountId}/watchlist?api_key=${environment.apiKey}&session_id=${sessionId}`,
      body
    );

  }
  getWatchListSeries(page: number): Observable<WatchListSeriesResponse> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');

    return this.http.get<WatchListSeriesResponse>(
      `${environment.apiBaseUrl}/account/${accountId}/watchlist/tv?api_key=${environment.apiKey}&session_id=${sessionId}&page=${page}`
    );
  }

  getAllWatchListSeries(): Observable<Serie[]> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
    return this.http.get<WatchListSeriesResponse>(
      `${environment.apiBaseUrl}/account/${accountId}/watchlist/tv?api_key=${environment.apiKey}&session_id=${sessionId}`
    ).pipe(
      map((response: { total_pages: any; }) => {
        const totalPages = response.total_pages;
        const requests: Observable<WatchListSeriesResponse>[] = [];
        for (let page = 1; page <= totalPages; page++) {
          requests.push(this.getWatchListSeries(page));
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

  deleteSerieFromWatchList(serie: Serie): Observable<any> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
    const body = {
      media_id: serie.id,
      media_type: 'tv',
      watchlist: false
    };

    return this.http.post<any>(
      `${environment.apiBaseUrl}/account/${accountId}/watchlist?api_key=${environment.apiKey}&session_id=${sessionId}`,
      body
    );

  }
}
