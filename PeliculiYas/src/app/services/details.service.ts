import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { auto } from '@popperjs/core';
import { Observable } from 'rxjs';
import { PeopleDetailsResponse } from '../models/people-details.interface';
import { CombinedCreditsResponse } from '../models/combined-credits.interface';
import { FilmDetailsResponse } from '../models/film-details.interface';
import { FilmCreditsResponse } from '../models/film-credits.interface';
import { SerieDetaisResponse } from '../models/series-details.interface';
import { SeasonDetailsResponse } from '../models/season-details.interface';

const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjNkZWUxOWU0OTVjYTFiN2M0MTcxYjYwMzIxNjc0YSIsIm5iZiI6MTczMTY3MDE0Ny45ODcyOTM3LCJzdWIiOiI2NzMxYmUyNzdlZjJjMzFkNzhlZGFjMDIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.pRL3NTdK1UwZt0giRHed4U1GbTS_y1htIp-k_LMXOp0'
@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private http: HttpClient) { }

  getPeopleDetails(id: number, language: string): Observable<PeopleDetailsResponse> {
    return this.http.get<PeopleDetailsResponse>(`https://api.themoviedb.org/3/person/${id}?language=${language}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }

  getPeopleCredits(id: number): Observable<CombinedCreditsResponse> {
    return this.http.get<CombinedCreditsResponse>(`https://api.themoviedb.org/3/person/${id}/combined_credits`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }


  getFilmdeatils(id: number, language: string): Observable<FilmDetailsResponse> {
    return this.http.get<FilmDetailsResponse>(`https://api.themoviedb.org/3/movie/${id}?language=${language}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }

  getFilmCredits(id: number): Observable<FilmCreditsResponse> {
    return this.http.get<FilmCreditsResponse>(`https://api.themoviedb.org/3/movie/${id}/credits`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }

  getSeriesDetails(id: number, language: string): Observable<SerieDetaisResponse> {
    return this.http.get<SerieDetaisResponse>(`https://api.themoviedb.org/3/tv/${id}?language=${language}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }

  getSeasonDetails(id: number, seasonNumber: number, language: string): Observable<SeasonDetailsResponse> {
    return this.http.get<SeasonDetailsResponse>(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?language=${language}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }

  getTrailer(id: number): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      }
    });
  }

}
