import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Film } from '../../models/film.interface';
import { WatchListService } from '../../services/watch-list.service';
import { Serie } from '../../models/serie.interface';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrl: './watch-list.component.css'
})
export class WatchListComponent implements OnInit {
  watchListFilms: Film[] = [];
  watchListSerie: Serie[] = [];
  userName = '';
  userPhoto = '';
  banner: string = "/q8eejQcg1bAqImEV8jh8RtBD4uH.jpg";

  constructor(private router: Router, private watchlistService: WatchListService) { }
  ngOnInit(): void {
    this.userName = localStorage.getItem('user_name') ?? '';
    this.userPhoto = localStorage.getItem('user_photo')
      ? `https://image.tmdb.org/t/p/original${localStorage.getItem(
        'user_photo'
      )}`
      : '';
    this.loadWatchListFilms();
    this.loadWatchListSeries();


  }

  loadWatchListFilms(): void {
    this.watchlistService.getAllWatchListFilms().subscribe(response => {
      this.watchListFilms = response;
      console.log('Series en la lista de seguimiento cargadas:', this.watchListFilms);
    });
  }

  loadWatchListSeries(): void {
    this.watchlistService.getAllWatchListSeries().subscribe(response => {
      this.watchListSerie = response;
      console.log('Series en la lista de seguimiento cargadas:', this.watchListSerie);
    });
  }


  navigateToMovies(): void {
    this.router.navigate(['watchlist/movies']);
  }

  navigateToSeries(): void {
    this.router.navigate(['watchlist/series']);
  }
  isLoggedIn() {
    return localStorage.getItem('logged_in') === 'true';
  }
  logout() {
    localStorage.clear();
    window.location.href = 'http://localhost:4200';
  }
  bannerImg() {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${this.banner}`;
  }
  verificarImg() {
    const partes: string[] = this.userPhoto.split("/").filter(part => part !== '');

    if (partes[partes.length - 1] === "originalnull") {
      this.userPhoto = "https://static.wikia.nocookie.net/mamarre-estudios-espanol/images/9/9f/Benjamin.png/revision/latest?cb=20201222175350&path-prefix=es"
    }
    return this.userPhoto;

  }

  getFilmPosterPath(): string {

    if (this.watchListFilms.length === 0) {
      return 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg';
    } else {

      return `https://image.tmdb.org/t/p/w500${this.watchListFilms[0].poster_path}`;
    }
  }
  getSeriePosterPath(): string {
    if (this.watchListFilms.length === 0) {
      return 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg';
    } else {

      return `https://image.tmdb.org/t/p/w500${this.watchListSerie[0].poster_path}`;
    }
  }
}
