import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDetailsResponse } from '../models/account-details.interface';
const ACCESS_TOKEN = '1b3dee19e495ca1b7c4171b60321674a'
const API_BASE_URL = 'https://api.themoviedb.org/3';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getAccountDetails(): Observable<AccountDetailsResponse> {
    let sessionId = localStorage.getItem('session_id');
    return this.http.get<AccountDetailsResponse>(
      `${API_BASE_URL}/account?api_key=${ACCESS_TOKEN}&session_id=${sessionId}`
    );
  }
}

