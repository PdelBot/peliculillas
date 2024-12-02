import { Component, OnInit } from '@angular/core';
import { RatingService } from '../../services/rating.service';

@Component({
  selector: 'app-rating-peliculas',
  templateUrl: './rating-peliculas.component.html',
  styleUrls: ['./rating-peliculas.component.css']
})


export class RatingPeliculasComponent implements OnInit {
  ratedMovies: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private ratingService: RatingService) {}

  ngOnInit(): void {
    this.loadRatedMovies();
  }

  loadRatedMovies(page: number = 1): void {
    this.ratingService.getRatedMovies(page).subscribe({
      next: (response) => {
        this.ratedMovies = response.results;
        this.totalPages = response.total_pages;
        this.currentPage = page;
      },
      error: (err) => console.error('Error al obtener las películas puntuadas:', err),
    });
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadRatedMovies(page);
    }
  }

  getImgUrl(path: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${path}`;
  }
}
