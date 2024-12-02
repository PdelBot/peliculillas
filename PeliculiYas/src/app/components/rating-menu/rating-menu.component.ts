import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RatingService } from '../../services/rating.service';
import { Film } from '../../models/film.interface';
import { Serie } from '../../models/serie.interface';

@Component({
  selector: 'app-rating-menu',
  templateUrl: './rating-menu.component.html',
  styleUrl: './rating-menu.component.css'
})
export class RatingMenuComponent implements OnInit {
  ratedMovies: Film[] = [];
  ratedSeries: Serie[] = [];
  userName = '';
  userPhoto = '';
  banner: string = "/q8eejQcg1bAqImEV8jh8RtBD4uH.jpg";

  constructor(private router: Router, private ratingService: RatingService) { }
  ngOnInit(): void {
    this.userName = localStorage.getItem('user_name') ?? '';
    this.userPhoto = localStorage.getItem('user_photo')
      ? `https://image.tmdb.org/t/p/original${localStorage.getItem(
        'user_photo'
      )}`
      : '';
    this.loadRatedFilms();
    this.loadRatedSeries();


  }

  loadRatedFilms(): void {
    this.ratingService.getRatedMovies(1).subscribe(response => {
      this.ratedMovies = response;
      console.log('Series en la lista de seguimiento cargadas:', this.ratedMovies);
    });
  }

  loadRatedSeries(): void {
    this.ratingService.getRatedSeries(1).subscribe(response => {
      this.ratedSeries = response;
      console.log('Series en la lista de seguimiento cargadas:', this.ratedSeries);
    });
  }


  navigateToMovies(): void {
    this.router.navigate(['ratingPeliculas']);
  }

  navigateToSeries(): void {
    this.router.navigate(['rating']);
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

    if (this.ratedMovies.length === 0) {
      return 'https://png.pngtree.com/thumb_back/fh260/background/20191113/pngtree-blue-film-technology-film-background-image_322042.jpg';
    } else {

      return `https://image.tmdb.org/t/p/w500${this.ratedMovies[0].poster_path}`;
    }
  }
  getSeriePosterPath(): string {
    if (this.ratedSeries.length === 0) {
      return 'https://png.pngtree.com/thumb_back/fh260/background/20191113/pngtree-blue-film-technology-film-background-image_322042.jpg';
    } else {

      return `https://image.tmdb.org/t/p/w500${this.ratedSeries[0].poster_path}`;
    }
  }
}