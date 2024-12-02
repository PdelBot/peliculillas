import { Component, OnInit } from '@angular/core';
import { RatingService } from '../../services/rating.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  ratedSeries: any[] = [];  
  currentPage: number = 1;  
  totalPages: number = 1;  
  userName = '';
  userPhoto = '';
  banner: string = "/q8eejQcg1bAqImEV8jh8RtBD4uH.jpg";

  constructor(private ratingService: RatingService) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('user_name') ?? '';
    this.userPhoto = localStorage.getItem('user_photo')
      ? `https://image.tmdb.org/t/p/original${localStorage.getItem(
        'user_photo'
      )}`
      : '';
    this.loadRatedSeries();
  }

  loadRatedSeries(page: number = 1): void {
    this.ratingService.getRatedSeries(page).subscribe({
      next: (response) => {
        this.ratedSeries = response.results;  
        this.totalPages = response.total_pages;  
        this.currentPage = page;  
      },
      error: (err) => console.error('Error al obtener las series puntuadas:', err),
    });
  }

   changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadRatedSeries(page);
    }
  }

  getImgUrl(path: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${path}`;
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
}
