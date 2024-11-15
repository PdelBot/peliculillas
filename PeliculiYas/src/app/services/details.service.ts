import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { auto } from '@popperjs/core';
import { Observable } from 'rxjs';
import { PeopleDetailsResponse } from '../models/people-details.interface';

const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjNkZWUxOWU0OTVjYTFiN2M0MTcxYjYwMzIxNjc0YSIsIm5iZiI6MTczMTY3MDE0Ny45ODcyOTM3LCJzdWIiOiI2NzMxYmUyNzdlZjJjMzFkNzhlZGFjMDIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.pRL3NTdK1UwZt0giRHed4U1GbTS_y1htIp-k_LMXOp0'
@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private http: HttpClient) { }
  
  getPeopleDetails(id: number): Observable<PeopleDetailsResponse> {
    return this.http.get<PeopleDetailsResponse>(`https://api.themoviedb.org/3/person/${id}?language=es-ES`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      }
    });
  }


  getPeopleCredits(id: number): Observable<any> {
    return this.http.get<any>(`https://api.themoviedb.org/3/person/${id}/combined_credits`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }
 
}
