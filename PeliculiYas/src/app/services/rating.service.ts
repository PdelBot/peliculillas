import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  private apiKey = environment.apiKey;
  private apiUrl = environment.apiBaseUrl;
  private sessionId = localStorage.getItem('session_id'); // Obtener la sesión del usuario

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


  // Para la lista de valoraciones

getRatedSeries(): Observable<any> {
  const url = `${this.apiUrl}/account/{account_id}/rated/tv?api_key=${this.apiKey}&session_id=${this.sessionId}&language=es-ES`;
  return this.http.get(url);
}



  

}
  