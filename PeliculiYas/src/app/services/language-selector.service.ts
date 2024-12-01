import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LanguageSelectedResponse } from '../models/language.interface';

@Injectable({
  providedIn: 'root'
})
export class LanguageSelectorService {

  private selectedLanguageSubject = new BehaviorSubject<string>('en-US');
  selectedLanguage$ = this.selectedLanguageSubject.asObservable();
  constructor(private http: HttpClient) { }

getLanguages(): Observable<LanguageSelectedResponse> {
    return this.http.get<LanguageSelectedResponse>(`${environment.apiBaseUrl}/configuration/languages?api_key=${environment.apiKey}`).pipe(
      map(languages => languages.filter(language => language.iso_639_1 === 'en' || language.iso_639_1 === 'es'))
    );;
  
  }
  


  setSelectedLanguage(language: string): void {
    localStorage.setItem('selectedLanguage', language);

    this.selectedLanguageSubject.next(language);
  }

  getSelectedLanguage(): string {
    return this.selectedLanguageSubject.value;
  }
}
