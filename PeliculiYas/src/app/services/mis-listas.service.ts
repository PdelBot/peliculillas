import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { myList, myListResponse } from '../models/my-list.interface';
import { myListDetailsResponse } from '../models/my-list-details.interface';

const API_KEY = '1b3dee19e495ca1b7c4171b60321674a';
const BASE_URL = 'https://api.themoviedb.org/3'

@Injectable({
  providedIn: 'root'
})
export class MisListasService {

  constructor(private http: HttpClient) { }

  createList(name: string, description: string){
    const sessionId = localStorage.getItem('session_id');
    const body = {
      name: name,
      description: description,
    }

    return this.http.post(`${BASE_URL}/list?api_key=${API_KEY}&session_id=${sessionId}`, body)
  }

  deleteList(id:number){
    const sessionId = localStorage.getItem('session_id');

    return this.http.delete(`${BASE_URL}/list/${id}?api_key=${API_KEY}&session_id=${sessionId}`);
  }

  getListas(): Observable<myListResponse> {
    const sessionId = localStorage.getItem('session_id');
    const userId = localStorage.getItem('user_id');

    return this.http.get<myListResponse>(`${BASE_URL}/account/${userId}/lists?api_key=${API_KEY}&session_id=${sessionId}`)
  }

  clearList(id:number){
    const sessionId = localStorage.getItem('session_id');
    const body = {
      confirm: true
    }

    return this.http.post(`${BASE_URL}/list/${id}/clear?api_key=${API_KEY}&session_id=${sessionId}`, body)

  }


  getDetailsList(id:string): Observable<myListDetailsResponse>{
    const sessionId = localStorage.getItem('session_id');
    return this.http.get<myListDetailsResponse>(`${BASE_URL}/list/${id}?api_key=${API_KEY}&session_id=${sessionId}`)
  }

  addFilm(idFilm: number, id: number){
    const sessionId = localStorage.getItem('session_id');
    const body = {
      media_id: idFilm
    };

    return this.http.post(`${BASE_URL}/list/${id}/add_item?api_key=${API_KEY}&session_id=${sessionId}`, body);
  }

  deleteFilm (idFilm: number, id: number){
    const sessionId = localStorage.getItem('session_id');
    const body = {
      media_id: idFilm
    };

    return this.http.post(`${BASE_URL}/list/${id}/remove_item?api_key=${API_KEY}&session_id=${sessionId}`, body);
  }
}
