import { Component, OnInit } from '@angular/core';
import { DetailsService } from '../../services/details.service';
import { Season, SerieDetaisResponse } from '../../models/series-details.interface';
import { SeasonDetailsResponse } from '../../models/season-details.interface';

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



  constructor(private detailsService: DetailsService) { }

  ngOnInit(): void {

    this.detailsService.getSeriesDetails(124364, 'es-ES').subscribe(data => {
      if (data.overview) {
        this.seriesDetails = data;
        this.seasonsId = data.seasons;
        this.loadSeasons(124364, this.seasonsId);
        this.rating = (this.seriesDetails.vote_average || 0) / 2; 
      } else {
        this.detailsService.getSeriesDetails(124364, 'en-US').subscribe(englishData => {
          this.seriesDetails = englishData;
          this.seasonsId = englishData.seasons;
          this.loadSeasons(124364, this.seasonsId);
        });
      }
    });


  }

  loadSeasons (serieId:number, seasons: Season[]):void{
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

}
