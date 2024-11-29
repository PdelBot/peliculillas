import { Injectable } from '@angular/core';
import { Film, FilmListResponse } from '../models/film.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SerieListResponse } from '../models/serie.interface';
import { ActorListResponse } from '../models/people.interface';
import { environment } from '../../environments/environment';
import { Genre, GenreListResponse } from '../models/genre.interface';


@Injectable({
  providedIn: 'root'
})
export class ListService {

  private genres: { [id: number]: string } = {};

  constructor(private http: HttpClient) {
    this.loadGenres();
  }

  //Obtener peliculas


  getPopularFilm(): Observable<FilmListResponse> {
    return this.http.get<FilmListResponse>(`${environment.apiBaseUrl}/movie/popular`, {
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
    return this.http.get<SerieListResponse>(`${environment.apiBaseUrl}/tv/popular?language=es-US&page=1`, {
      headers: {
        'Authorization': `Bearer ${environment.access_token}`,
      }
    });
  }

  //Obtener actores

  getActors(): Observable<ActorListResponse> {
    return this.http.get<ActorListResponse>(`${environment.apiBaseUrl}/person/popular?language=es-US&page=1`, {
      headers: {
        'Authorization': `Bearer ${environment.access_token}`,
      }
    });
  }

  //Listado de paginación peliculas

  getFilmPage(page: number): Observable<FilmListResponse> {
    return this.http.get<FilmListResponse>(`${environment.apiBaseUrl}/movie/popular?language=es-US&page=${page}`, {
      headers: {
        'Authorization': `Bearer ${environment.access_token}`,
      }
    });
  }

  //Listado de paginación de series
  getSeriesPage(page: number): Observable<SerieListResponse> {
    return this.http.get<SerieListResponse>(`${environment.apiBaseUrl}/tv/popular?language=es-US&page=${page}`, {
      headers: {
        'Authorization': `Bearer ${environment.access_token}`,
      }
    });
  }

  //Listado de paginación de actores
  getActorPage(page: number): Observable<ActorListResponse> {
    return this.http.get<ActorListResponse>(`${environment.apiBaseUrl}/person/popular?language=es-US&page=${page}`, {
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
    this.http.get<{ genres: { id: number, name: string }[] }>(`${environment.apiBaseUrl}/genre/movie/list?language=es-US`, {
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
    return this.http.get<GenreListResponse>(`${environment.apiBaseUrl}/genre/tv/list`, {
      headers: {
        'Authorization': `Bearer ${environment.access_token}`,
      }
    });
  }

  //Generos de peliculas
  getFilmGenres(): Observable<GenreListResponse> {
    return this.http.get<GenreListResponse>(`${environment.apiBaseUrl}/genre/movie/list`, {
      headers: {
        'Authorization': `Bearer ${environment.access_token}`,
      }
    });
  }


  //peliculas populares descendentemente
  getPopularFilmDesc(generos: string[] = []): Observable<FilmListResponse> {
    const genresQuery = generos.length ? `&with_genres=${generos.join(',')}` : '';
    return this.http.get<FilmListResponse>(`${environment.apiBaseUrl}/discover/movie?include_adult=false&include_video=false&language=es-US&page=1&sort_by=popularity.desc${genresQuery}`, {
      headers: {
        'Authorization': `Bearer ${environment.access_token}`
      }
    });
  }
  //peliculas populares ascendentemente
  getPopularFilmAsc(generos: string[] = []): Observable<FilmListResponse> {
    const genresQuery = generos.length ? `&with_genres=${generos.join(',')}` : '';
    return this.http.get<FilmListResponse>(`${environment.apiBaseUrl}/discover/movie?include_adult=false&include_video=false&language=es-US&page=1&sort_by=popularity.asc${genresQuery}`, {
      headers: {
        'Authorization': `Bearer ${environment.access_token}`
      }
    });
  }

  //peliculas valoracion descendentemente

  getRatedFilmDesc(generos: string[] = []): Observable<FilmListResponse> {
    const genresQuery = generos.length ? `&with_genres=${generos.join(',')}` : '';
    return this.http.get<FilmListResponse>(`${environment.apiBaseUrl}/discover/movie?include_adult=false&include_video=false&language=es-US&page=1&sort_by=vote_average.desc&vote_count.gte=200${genresQuery}`, {
      headers: {
        'Authorization': `Bearer ${environment.access_token}`
      }
    });
  }

  //peliculas valoracion ascendentemente

  getRatedFilmAsc(generos: string[] = []): Observable<FilmListResponse> {
    const genresQuery = generos.length ? `&with_genres=${generos.join(',')}` : '';

    return this.http.get<FilmListResponse>(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-US&page=1&sort_by=vote_average.asc${genresQuery}`
      , {
        headers: {
          'Authorization': `Bearer ${environment.access_token}`
        }
      });
  }

  //series populares descendentemente

  getPopularSeriesDesc(generos: string[] = []): Observable<SerieListResponse> {
    const genresQuery = generos.length ? `&with_genres=${generos.join(',')}` : '';

    return this.http.get<SerieListResponse>(`https://api.themoviedb.org/3/discover/tv?include_adult=false&language=es-US&page=1&sort_by=popularity.desc${genresQuery}`
      , {
        headers: {
          'Authorization': `Bearer ${environment.access_token}`
        }
      });
  }

  //series populares ascendentemente
  getPopularSeriesAsc(generos: string[] = []): Observable<SerieListResponse> {
    const genresQuery = generos.length ? `&with_genres=${generos.join(',')}` : '';

    return this.http.get<SerieListResponse>(`https://api.themoviedb.org/3/discover/tv?include_adult=false&language=es-US&page=1&sort_by=popularity.asc${genresQuery}`
      , {
        headers: {
          'Authorization': `Bearer ${environment.access_token}`
        }
      });
  }

  //series valoracion descendentemente
  getRatedSeriesDesc(generos: string[] = []): Observable<SerieListResponse> {
    const genresQuery = generos.length ? `&with_genres=${generos.join(',')}` : '';

    return this.http.get<SerieListResponse>(`https://api.themoviedb.org/3/discover/tv?include_adult=false&language=es-US&page=1&sort_by=vote_average.desc&vote_count.gte=200${genresQuery}`
      , {
        headers: {
          'Authorization': `Bearer ${environment.access_token}`
        }
      });
  }

  //series valoracion ascendentemente
  getRatedSeriesAsc(generos: string[] = []): Observable<SerieListResponse> {
    const genresQuery = generos.length ? `&with_genres=${generos.join(',')}` : '';

    return this.http.get<SerieListResponse>(`https://api.themoviedb.org/3/discover/tv?include_adult=false&language=es-US&page=1&sort_by=vote_average.asc&vote_count.gte=200${genresQuery}`
      , {
        headers: {
          'Authorization': `Bearer ${environment.access_token}`
        }
      });
  }

  getFilterFilms(criterio: string, generos: number[]): Observable<FilmListResponse> {
    const genresQuery = generos.length ? `&with_genres=${generos.join(',')}` : '';
    return this.http.get<FilmListResponse>(`${environment.apiBaseUrl}/discover/movie?include_adult=false&include_video=false&language=es-US&page=1&sort_by=${criterio}${genresQuery}`, {
      headers: {
        'Authorization': `Bearer ${environment.access_token}`
      }
    });
  }

  getFilterSeries(criterio: string, generos: number[]): Observable<SerieListResponse> {
    const genresQuery = generos.length ? `&with_genres=${generos.join(',')}` : '';
    return this.http.get<SerieListResponse>(`${environment.apiBaseUrl}/discover/tv?include_adult=false&language=es-US&page=1&sort_by=${criterio}${genresQuery}`, {
      headers: {
        'Authorization': `Bearer ${environment.access_token}`
      }
    });
  }

}
