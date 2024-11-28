import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DetailsService } from '../../services/details.service';
import { FilmDetailsResponse } from '../../models/film-details.interface';
import { Cast, Crew } from '../../models/film-credits.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TrailerDetailsResponse } from '../../models/trailer-details.interface';
import { ActivatedRoute } from '@angular/router';
import { RatingService } from '../../services/rating.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrl: './film-details.component.css'
})
export class FilmDetailsComponent implements OnInit {
  trailerUrl: SafeResourceUrl | null = null;


  trailer: TrailerDetailsResponse | undefined;
  film: FilmDetailsResponse | undefined;
  listCast: Cast[] = [];
  listCrew: Crew[] = [];
  rating: number = 0;
  userRating: number = 0;  


  constructor(private detailsService: DetailsService, private sanitizer: DomSanitizer, private route: ActivatedRoute, private ratingService: RatingService
  ) { }

  ngOnInit(): void {
    const filmId = this.route.snapshot.paramMap.get('id');
    

    if (filmId) {
      this.detailsService.getFilmdeatils(+filmId, 'es-ES').subscribe((response) => {
        this.film = response;
      });

      this.detailsService.getFilmdeatils(+filmId, 'es-ES').subscribe(data => {
        if (data.overview) {
          this.film = data;
          this.rating = (this.film.vote_average || 0) / 2;
        } else {
          this.detailsService.getFilmdeatils(+filmId, 'en-US').subscribe(englishData => {
            this.film = englishData;
          });
        }
      });

      this.detailsService.getFilmCredits(+filmId).subscribe(filmCreditsCast => {
        this.listCast = filmCreditsCast.cast;


      });
        // Cargar la calificación del usuario desde TMDb
    this.ratingService.getUserRating(+filmId).subscribe({
      next: (response) => {
        this.userRating = response.rated?.value || 0; // Cargar calificación previa si existe
      },
      error: (err) => console.error('Error al obtener la calificación del usuario:', err),
    });
  
    }
  }

  watchTrailer() {
    this.detailsService.getTrailer(this.film!.id | 0).subscribe(data => {
      if (data.results.length > 0) {
        const lastTrailer = data.results[data.results.length - 1];
        const youtubeUrl = `https://www.youtube.com/embed/${lastTrailer.key}`;
        this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(youtubeUrl);
        window.open(youtubeUrl, '_blank');

        console.log(this.trailerUrl);
      } else {
        this.trailerUrl = null;
      }
    });
  }


  getImgUrl(path: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${path}`;
  }


  saveRating(newRating: number): void {
    if (this.film) {
      this.ratingService.saveRating(this.film.id, newRating).subscribe({
        next: () => {
          this.userRating = newRating; // Actualizamos la calificación actual en la vista
          console.log(`Calificación de ${newRating} guardada exitosamente en TMDb`);
        },
        error: (err) => console.error('Error al guardar la calificación en TMDb:', err),
      });
    }
  }
  
  deleteRating(): void {
    if (this.film) {
      this.ratingService.deleteRating(this.film.id).subscribe({
        next: () => {
          this.userRating = 0; // Actualizamos la calificación actual en la vista
          console.log('Calificación eliminada exitosamente de TMDb');
        },
        error: (err) => console.error('Error al eliminar la calificación en TMDb:', err),
      });
    }
  }

}

