import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { myList, myListResponse } from '../models/my-list.interface';
import { myListDetailsResponse } from '../models/my-list-details.interface';
import { environment } from '../../environments/environments';



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

    return this.http.post(`${environment.apiBaseUrl}/list?api_key=${environment.apiKey}&session_id=${sessionId}`, body)
  }

  deleteList(id:number){
    const sessionId = localStorage.getItem('session_id');

    return this.http.delete(`${environment.apiBaseUrl}/list/${id}?api_key=${environment.apiKey}&session_id=${sessionId}`);
  }

  getListas(): Observable<myListResponse> {
    const sessionId = localStorage.getItem('session_id');
    const userId = localStorage.getItem('user_id');

    return this.http.get<myListResponse>(`${environment.apiBaseUrl}/account/${userId}/lists?api_key=${environment.apiKey}&session_id=${sessionId}`)
  }

  clearList(id:number){
    const sessionId = localStorage.getItem('session_id');


    return this.http.post(`${environment.apiBaseUrl}/list/${id}/clear?api_key=${environment.apiKey}&session_id=${sessionId}&confirm=true`, null)

  }


  getDetailsList(id:string): Observable<myListDetailsResponse>{
    const sessionId = localStorage.getItem('session_id');
    return this.http.get<myListDetailsResponse>(`${environment.apiBaseUrl}/list/${id}?api_key=${environment.apiKey}&session_id=${sessionId}`)
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

    return this.http.post(`${environment.apiBaseUrlV4}/list/${id}/items?api_key=${environment.apiKey}&session_id=${sessionId}`, body);
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

    return this.http.delete(`${environment.apiBaseUrlV4}/list/${id}/items?api_key=${environment.apiKey}&session_id=${sessionId}`, {body});
  }

  setList(newName: string, newDescription: string, id:number){
    const sessionId = localStorage.getItem('session_id');
    
    const body ={
      "name": newName,
      "description": newDescription,
    }
    return this.http.put(`${environment.apiBaseUrlV4}/list/${id}?api_key=${environment.apiKey}&session_id=${sessionId}`, body);
  }

  setFondo(id: number, poster: string){
    const sessionId = localStorage.getItem('session_id');
    
    const body ={
      "poster_path": poster
    }
    return this.http.put(`${environment.apiBaseUrlV4}/list/${id}?api_key=${environment.apiKey}&session_id=${sessionId}`, body);
  }
}
