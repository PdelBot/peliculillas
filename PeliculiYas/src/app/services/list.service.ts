import { Injectable } from '@angular/core';
import { Film, FilmListResponse } from '../models/film.interface';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Serie, SerieListResponse } from '../models/serie.interface';
import { ActorListResponse } from '../models/people.interface';
import { environment } from '../../environments/environment';
import { GenreListResponse } from '../models/genre.interface';
import { LanguageSelectorService } from './language-selector.service';



@Injectable({
  providedIn: 'root'
})
export class ListService {


  private genres: { [id: number]: string } = {};

  constructor(private http: HttpClient, private languageService: LanguageSelectorService) {
    this.loadGenres();
  }

  //Obtener peliculas


  getPopularFilm(): Observable<FilmListResponse> {
    const language = this.languageService.getSelectedLanguage();

    return this.http.get<FilmListResponse>(`${environment.apiBaseUrl}/movie/popular?language=${language}`, {
      headers: {
        'Authorization': `Bearer ${environment.access_token}`

      }
    });
  }

  getOneFilm(id: number): Observable<Film> {
    return this.http.get<Film>(`${environment.apiBaseUrl}/movie/${id}`, {
      headers: {

        'Authorization': `Bearer ${environment.access_token}`,

      }
    })
  }

  //Obtener series

  getPopularSeries(): Observable<SerieListResponse> {
    const language = this.languageService.getSelectedLanguage();
    return this.http.get<SerieListResponse>(`${environment.apiBaseUrl}/tv/popular?language=${language}&page=1`, {
      headers: {

        'Authorization': `Bearer ${environment.access_token}`,

      }
    });
  }

  //Obtener actores

  getActors(): Observable<ActorListResponse> {
    const language = this.languageService.getSelectedLanguage();

    return this.http.get<ActorListResponse>(`${environment.apiBaseUrl}/person/popular=${language}&page=1`, {
      headers: {

        'Authorization': `Bearer ${environment.access_token}`,

      }
    });
  }

  //Listado de paginación peliculas

  getFilmPage(page: number): Observable<FilmListResponse> {
    const language = this.languageService.getSelectedLanguage();

    return this.http.get<FilmListResponse>(`${environment.apiBaseUrl}/movie/popular?language=${language}&page=${page}`, {
      headers: {

        'Authorization': `Bearer ${environment.access_token}`,

      }
    });
  }

  //Listado de paginación de series
  getSeriesPage(page: number): Observable<SerieListResponse> {
    const language = this.languageService.getSelectedLanguage();

    return this.http.get<SerieListResponse>(`${environment.apiBaseUrl}/tv/popular?language=${language}&page=${page}`, {
      headers: {

        'Authorization': `Bearer ${environment.access_token}`,

      }
    });
  }

  //Listado de paginación de actores
  getActorPage(page: number): Observable<ActorListResponse> {
    const language = this.languageService.getSelectedLanguage();

    return this.http.get<ActorListResponse>(`${environment.apiBaseUrl}/person/popular?language=${language}&page=${page}`, {
      headers: {

        'Authorization': `Bearer ${environment.access_token}`,

      }
    });
  }

  getColorValoracion({ valoracion }: { valoracion: number }): { [key: string]: string } {
    if (valoracion <= 4) {
      return { background: 'linear-gradient(-45deg, #ff0000 0%, #edad8f 100%)' };
    }
    if (valoracion > 4 && valoracion < 8) {
      return { background: 'linear-gradient(-45deg, #fc00ff 0%, #00dbde 100%)' };
    }
    return { background: 'linear-gradient(-45deg, #2bff00 0%, #00dbde 100%)' };
  }

  private loadGenres() {
    const language = this.languageService.getSelectedLanguage();

    this.http.get<{ genres: { id: number, name: string }[] }>(`${environment.apiBaseUrl}/genre/movie/list?language=${language}`, {
      headers: {

        'Authorization': `Bearer ${environment.access_token}`,

      }
    }).subscribe(response => {
      response.genres.forEach(genre => {
        this.genres[genre.id] = genre.name;
      });
    });
  }
  //Obtener el nombre del genero
  getGenreName(id: number): string {
    return this.genres[id] || 'Unknown';
  }

  //Generos de series
  getSeriesGenres(): Observable<GenreListResponse> {
    const language = this.languageService.getSelectedLanguage();

    return this.http.get<GenreListResponse>(`${environment.apiBaseUrl}/genre/tv/list?language=${language}`, {
      headers: {
        'Authorization': `Bearer ${environment.access_token}`,
      }
    });
  }

  //Generos de peliculas
  getFilmGenres(): Observable<GenreListResponse> {
    const language = this.languageService.getSelectedLanguage();

    return this.http.get<GenreListResponse>(`${environment.apiBaseUrl}/genre/movie/list?language=${language}`, {
      headers: {
        'Authorization': `Bearer ${environment.access_token}`,
      }
    });
  }


  //peliculas populares descendentemente
  getPopularFilmDesc(generos: string[] = []): Observable<FilmListResponse> {
    const language = this.languageService.getSelectedLanguage();

    const genresQuery = generos.length ? `&with_genres=${generos.join(',')}` : '';
    return this.http.get<FilmListResponse>(`${environment.apiBaseUrl}/discover/movie?include_adult=false&include_video=false&language=${language}&page=1&sort_by=popularity.desc${genresQuery}`, {
      headers: {
        'Authorization': `Bearer ${environment.access_token}`
      }
    });
  }
 

  // Ordenar peliculas y series y filtrar por genero
  getOrderedFilms(criterio: string, generos: number[], page: number): Observable<FilmListResponse> {

    const genresQuery = generos.length ? `&with_genres=${generos.join(',')}` : '';
    const language = this.languageService.getSelectedLanguage();
    return this.http.get<FilmListResponse>(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=${language}&page=${page}&sort_by=${criterio}${genresQuery}`, {
      headers: {
        'Authorization': `Bearer ${environment.access_token}`
      }
    });
  }

  getOrderedSeries(criterio: string, generos: number[], page: number): Observable<SerieListResponse> {

    const genresQuery = generos.length ? `&with_genres=${generos.join(',')}` : '';
    const language = this.languageService.getSelectedLanguage();
    return this.http.get<SerieListResponse>(`https://api.themoviedb.org/3/discover/tv?include_adult=false&language=${language}&page=${page}&sort_by=${criterio}${genresQuery}`, {
      headers: {
        'Authorization': `Bearer ${environment.access_token}`
      }
    });
  }

  //buscar peliculas, series y actores
  searchMovies(query: string): Observable<FilmListResponse> {
    return this.http.get<FilmListResponse>(`https://api.themoviedb.org/3/search/movie?query=${query}&language=es-US&page=1&include_adult=false`, {
      headers: {
        'Authorization': `Bearer ${environment.access_token}`
      }
    });
  }

  searchSeries(query: string): Observable<SerieListResponse> {
    return this.http.get<SerieListResponse>(`https://api.themoviedb.org/3/search/tv?query=${query}&language=es-US&page=1&include_adult=false`, {
      headers: {
        'Authorization': `Bearer ${environment.access_token}`
      }
    });
  }

  searchPeople(query: string): Observable<ActorListResponse> {
    return this.http.get<ActorListResponse>(`https://api.themoviedb.org/3/search/person?query=${query}&language=es-US&page=1&include_adult=false`, {
      headers: {
        'Authorization': `Bearer ${environment.access_token}`
      }
    });
  }

  getAllFilteredFilms(criterio: string, generos: number[]): Observable<Film[]> {
    const language = this.languageService.getSelectedLanguage();

    return this.http.get<FilmListResponse>(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=${language}&sort_by=${criterio}`, {
      headers: {
        'Authorization': `Bearer ${environment.access_token}`
      }
    }
    ).pipe(
      map((response: { total_pages: any; }) => {
        const totalPages = Math.min(response.total_pages, 20);
        const requests: Observable<FilmListResponse>[] = [];
        for (let page = 1; page <= totalPages; page++) {
          requests.push(this.getOrderedFilms(criterio, generos, page));
        }
        return forkJoin(requests).pipe(
          map((responses: any[]) => {
            return responses.reduce((acc, res) => acc.concat(res.results), []);
          })
        );
      }),
      switchMap(obs => obs)
    );
  }

  getAllFilteredSeries(criterio: string, generos: number[]): Observable<Serie[]> {
    const language = this.languageService.getSelectedLanguage();

    return this.http.get<SerieListResponse>(
      `https://api.themoviedb.org/3/discover/tv?include_adult=false&language=${language}&sort_by=${criterio}`, {
      headers: {
        'Authorization': `Bearer ${environment.access_token}`
      }
    }
    ).pipe(
      map((response: { total_pages: any; }) => {
        const totalPages = Math.min(response.total_pages, 20);
        const requests: Observable<SerieListResponse>[] = [];
        for (let page = 1; page <= totalPages; page++) {
          requests.push(this.getOrderedSeries(criterio, generos, page));
        }
        return forkJoin(requests).pipe(
          map((responses: any[]) => {
            return responses.reduce((acc, res) => acc.concat(res.results), []);
          })
        );
      }),
      switchMap(obs => obs)
    );
  }
}
