import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { myList, myListResponse } from '../models/my-list.interface';
import { myListDetailsResponse } from '../models/my-list-details.interface';

const API_KEY = '1b3dee19e495ca1b7c4171b60321674a';
const BASE_URL = 'https://api.themoviedb.org/3'
const BASE_URL_v4 = "https://api.themoviedb.org/4"

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
      language: 'es-Es'
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


    return this.http.post(`${BASE_URL}/list/${id}/clear?api_key=${API_KEY}&session_id=${sessionId}&confirm=true`, null)

  }


  getDetailsList(id:string): Observable<myListDetailsResponse>{
    const sessionId = localStorage.getItem('session_id');
    return this.http.get<myListDetailsResponse>(`${BASE_URL}/list/${id}?api_key=${API_KEY}&session_id=${sessionId}`)
  }

  add(idFilm: number, id: number, type: string){
    const sessionId = localStorage.getItem('session_id');
    const body = {
      items: [
        {
          media_type: type,
          media_id: idFilm
        }
      ]
    };

    return this.http.post(`${BASE_URL_v4}/list/${id}/items?api_key=${API_KEY}&session_id=${sessionId}`, body);
  }

  delete(idFilm: number, id: number, type: string){
    const sessionId = localStorage.getItem('session_id');
    const body = {
      items: [
        {
          media_type: type,
          media_id: idFilm
        }
      ]
    };

    return this.http.delete(`${BASE_URL_v4}/list/${id}/items?api_key=${API_KEY}&session_id=${sessionId}`, {body});
  }

  setList(newName: string, newDescription: string, id:number){
    const sessionId = localStorage.getItem('session_id');
    
    const body ={
      "name": newName,
      "description": newDescription,
    }
    return this.http.put(`${BASE_URL_v4}/list/${id}?api_key=${API_KEY}&session_id=${sessionId}`, body);
  }
}
