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

  constructor(private ratingService: RatingService) {}

  ngOnInit(): void {
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
}
