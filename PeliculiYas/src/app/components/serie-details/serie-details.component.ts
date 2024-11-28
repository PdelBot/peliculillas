  import { Component, OnInit } from '@angular/core';
  import { DetailsService } from '../../services/details.service';
  import { Season, SerieDetaisResponse } from '../../models/series-details.interface';
  import { SeasonDetailsResponse } from '../../models/season-details.interface';
  import { ActivatedRoute } from '@angular/router';
  import { RatingService } from '../../services/rating.service';


  @Component({
    selector: 'app-serie-details',
    templateUrl: './serie-details.component.html',
    styleUrl: './serie-details.component.css'
    
  })
  export class SerieDetailsComponent implements OnInit {

    seriesDetails: SerieDetaisResponse | undefined;
    seasonsId: Season[] = [];
    seasons: SeasonDetailsResponse[] = [];
    selectedSeason: SeasonDetailsResponse | undefined;
    rating: number = 0;
    userRatingS: number = 0;



    constructor(private detailsService: DetailsService, private route: ActivatedRoute, private ratingService: RatingService
    ) { }

    ngOnInit(): void {
      const serieId = this.route.snapshot.paramMap.get('id');
      if (serieId) {
        this.detailsService.getSeriesDetails(+serieId, 'es-ES').subscribe((response) => {
          this.seriesDetails = response;
        });


        this.detailsService.getSeriesDetails(+serieId, 'es-ES').subscribe(data => {
          if (data.overview) {
            this.seriesDetails = data;
            this.seasonsId = data.seasons;
            this.loadSeasons(+serieId, this.seasonsId);
            this.rating = (this.seriesDetails.vote_average || 0) / 2;
          } else {
            this.detailsService.getSeriesDetails(+serieId, 'en-US').subscribe(englishData => {
              this.seriesDetails = englishData;
              this.seasonsId = englishData.seasons;
              this.loadSeasons(+serieId, this.seasonsId);
            });
          }
        });

            // Cargar la calificación del usuario desde TMDb
            this.ratingService.getUserRatingS(+serieId).subscribe({
              next: (response) => {
                this.userRatingS = response.rated?.value || 0; // Cargar calificación previa si existe
              },
              error: (err) => console.error('Error al obtener la calificación del usuario:', err),
            });

      }

    }

    loadSeasons(serieId: number, seasons: Season[]): void {
      seasons.forEach(season => {
        this.detailsService.getSeasonDetails(serieId, season.season_number, 'es-ES').subscribe(data => {
          this.seasons.push(data);
        });
      });
    }

    selectSeason(event: Event, season: SeasonDetailsResponse): void {
      event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
      this.selectedSeason = season;
    }

    getImgUrl(path: string): string {
      const baseUrl = 'https://image.tmdb.org/t/p/w500';
      return `${baseUrl}${path}`;
    }


  // Guardar la calificación del usuario
  saveRatingS(newRating: number): void {
    if (this.seriesDetails) {
      this.ratingService.saveRatingS(this.seriesDetails.id, newRating).subscribe({
        next: () => {
          this.userRatingS = newRating; // Actualizamos la calificación actual en la vista
          console.log(`Calificación de ${newRating} guardada exitosamente en TMDb`);
        },
        error: (err) => console.error('Error al guardar la calificación en TMDb:', err),
      });
    }
  }

  // Borrar la calificación del usuario
  deleteRatingS(): void {
    if (this.seriesDetails) {
      this.ratingService.deleteRatingS(this.seriesDetails.id).subscribe({
        next: () => {
          this.userRatingS = 0; // Actualizamos la calificación actual en la vista
          console.log('Calificación eliminada exitosamente de TMDb');
        },
        error: (err) => console.error('Error al eliminar la calificación en TMDb:', err),
      });
    }
  }
  }
