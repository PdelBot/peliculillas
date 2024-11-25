import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateRequestTokenResponse } from '../models/create-request-token.interface.';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateSessionResponse } from '../models/create-session.interface';

const ACCESS_TOKEN = '1b3dee19e495ca1b7c4171b60321674a'
const API_BASE_URL = 'https://api.themoviedb.org/3';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // STEP 1
  createRequestToken(): Observable<CreateRequestTokenResponse> {
    return this.http.get<CreateRequestTokenResponse>(
      `${API_BASE_URL}/authentication/token/new?api_key=${ACCESS_TOKEN}`
    );
  }

  // STEP 3
  createSession(): Observable<CreateSessionResponse> {
    return this.http.post<CreateSessionResponse>(
      `${API_BASE_URL}/authentication/session/new?api_key=${ACCESS_TOKEN}`,
      {
        request_token: localStorage.getItem('token'),
      }
    );
  }
}
