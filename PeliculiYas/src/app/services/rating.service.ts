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
  private sessionId = localStorage.getItem('session_id'); // Obtener la sesión del usuario
  private accountId = localStorage.getItem('account_id'); // Obtener el ID del usuario

  constructor(private http: HttpClient) {}

  // Obtener la calificación del usuario para una película específica
  getUserRating(movieId: number): Observable<any> {
    const url = `${this.apiUrl}/movie/${movieId}/account_states?api_key=${this.apiKey}&session_id=${this.sessionId}`;
    return this.http.get(url);
  }

  // Guardar la calificación del usuario en TMDb
  saveRating(movieId: number, rating: number): Observable<any> {
    const url = `${this.apiUrl}/movie/${movieId}/rating?api_key=${this.apiKey}&session_id=${this.sessionId}`;
    return this.http.post(url, { value: rating });
  }

  // Borrar la calificación del usuario en TMDb
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


  // Para la lista de valoraciones de series 

  getRatedSeries(page: number): Observable<any> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
  
    return this.http.get<any>(
      `${environment.apiBaseUrl}/account/${accountId}/rated/tv?api_key=${environment.apiKey}&session_id=${sessionId}&page=${page}`
    );
  }
}
  