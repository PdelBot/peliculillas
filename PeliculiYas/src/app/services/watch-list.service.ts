import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Film } from '../models/film.interface';
import { Observable } from 'rxjs';
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
  getWatchListFilms(): Observable<WatchListFilmResponse> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');

    return this.http.get<WatchListFilmResponse>(
      `${environment.apiBaseUrl}/account/${accountId}/watchlist/movies?api_key=${environment.apiKey}&session_id=${sessionId}`
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
  getWatchListSeries(): Observable<WatchListSeriesResponse> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');

    return this.http.get<WatchListSeriesResponse>(
      `${environment.apiBaseUrl}/account/${accountId}/watchlist/tv?api_key=${environment.apiKey}&session_id=${sessionId}`
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
