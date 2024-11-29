import { Component, OnInit } from '@angular/core';
import { RatingService } from '../../services/rating.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  ratedSeries: any[] = []; // Array para guardar las series puntuadas

  constructor(private ratingService: RatingService) {}

  ngOnInit(): void {
    this.loadRatedSeries();
  }

  loadRatedSeries(): void {
    this.ratingService.getRatedSeries().subscribe({
      next: (response) => {
        this.ratedSeries = response.results; // Las series puntuadas están en `results`
      },
      error: (err) => console.error('Error al obtener las series puntuadas:', err),
    });
  }

  getImgUrl(path: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${path}`;
  }
}
