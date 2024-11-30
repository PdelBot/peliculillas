import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeopleDetailsResponse } from '../models/people-details.interface';
import { CombinedCreditsResponse } from '../models/combined-credits.interface';
import { FilmDetailsResponse } from '../models/film-details.interface';
import { FilmCreditsResponse } from '../models/film-credits.interface';
import { SerieDetaisResponse } from '../models/series-details.interface';
import { SeasonDetailsResponse } from '../models/season-details.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private http: HttpClient) { }

  getPeopleDetails(id: number, language: string): Observable<PeopleDetailsResponse> {
    return this.http.get<PeopleDetailsResponse>(`${environment.apiBaseUrl}/person/${id}?language=${language}`, {
      headers: {
        Authorization: `Bearer ${environment.access_token}`,
      },
    });
  }

  getPeopleCredits(id: number): Observable<CombinedCreditsResponse> {
    return this.http.get<CombinedCreditsResponse>(`${environment.apiBaseUrl}/person/${id}/combined_credits`, {
      headers: {
        Authorization: `Bearer ${environment.access_token}`,
      },
    });
  }


  getFilmdeatils(id: number, language: string): Observable<FilmDetailsResponse> {
    return this.http.get<FilmDetailsResponse>(`${environment.apiBaseUrl}/movie/${id}?language=${language}`, {
      headers: {
        Authorization: `Bearer ${environment.access_token}`,
      },
    });
  }

  getFilmCredits(id: number): Observable<FilmCreditsResponse> {
    return this.http.get<FilmCreditsResponse>(`${environment.apiBaseUrl}/movie/${id}/credits`, {
      headers: {
        Authorization: `Bearer ${environment.access_token}`,
      },
    });
  }

  getSeriesDetails(id: number, language: string): Observable<SerieDetaisResponse> {
    return this.http.get<SerieDetaisResponse>(`${environment.apiBaseUrl}/tv/${id}?language=${language}`, {
      headers: {
        Authorization: `Bearer ${environment.access_token}`,
      },
    });
  }

  getSeasonDetails(id: number, seasonNumber: number, language: string): Observable<SeasonDetailsResponse> {
    return this.http.get<SeasonDetailsResponse>(`${environment.apiBaseUrl}/tv/${id}/season/${seasonNumber}?language=${language}`, {
      headers: {
        Authorization: `Bearer ${environment.access_token}`,
      },
    });
  }

  getTrailer(id: number): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/movie/${id}/videos`, {
      headers: {
        Authorization: `Bearer ${environment.access_token}`,
      }
    });
  }

}
