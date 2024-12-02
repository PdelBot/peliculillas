import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  private apiKey = environment.apiKey;
  private apiUrl = environment.apiBaseUrl;
  private sessionId = localStorage.getItem('session_id'); 
  private accountId = localStorage.getItem('account_id'); 
  constructor(private http: HttpClient) {}

  // Para las peliculas
  getUserRating(movieId: number): Observable<any> {
    const url = `${this.apiUrl}/movie/${movieId}/account_states?api_key=${this.apiKey}&session_id=${this.sessionId}`;
    return this.http.get(url);
  }

  saveRating(movieId: number, rating: number): Observable<any> {
    const url = `${this.apiUrl}/movie/${movieId}/rating?api_key=${this.apiKey}&session_id=${this.sessionId}`;
    return this.http.post(url, { value: rating });
  }

  
  deleteRating(movieId: number): Observable<any> {
    const url = `${this.apiUrl}/movie/${movieId}/rating?api_key=${this.apiKey}&session_id=${this.sessionId}`;
    return this.http.delete(url);
  }

  // Pa las series
  getUserRatingS(serieId: number): Observable<any> {
    const url = `${this.apiUrl}/tv/${serieId}/account_states?api_key=${this.apiKey}&session_id=${this.sessionId}`;
    return this.http.get(url);
  }

  saveRatingS(serieId: number, rating: number): Observable<any> {
    const url = `${this.apiUrl}/tv/${serieId}/rating?api_key=${this.apiKey}&session_id=${this.sessionId}`;
    return this.http.post(url, { value: rating });
  }

  deleteRatingS(serieId: number): Observable<any> {
    const url = `${this.apiUrl}/tv/${serieId}/rating?api_key=${this.apiKey}&session_id=${this.sessionId}`;
    return this.http.delete(url);
  }


  // Para la lista de valoraciones 

  getRatedSeries(page: number): Observable<any> {
  
    return this.http.get<any>(
      `${environment.apiBaseUrl}/account/${this.accountId}/rated/tv?api_key=${environment.apiKey}&session_id=${this.sessionId}&page=${page}`
    );
  }


  getRatedMovies(page: number): Observable<any> {
    const url = `${this.apiUrl}/account/${this.accountId}/rated/movies?api_key=${this.apiKey}&session_id=${this.sessionId}&page=${page}`;
    return this.http.get<any>(url);
  }
}
