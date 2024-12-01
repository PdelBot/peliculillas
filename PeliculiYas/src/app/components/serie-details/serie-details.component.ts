import { Component, OnInit } from '@angular/core';
import { DetailsService } from '../../services/details.service';
import { Season, SerieDetaisResponse } from '../../models/series-details.interface';
import { SeasonDetailsResponse } from '../../models/season-details.interface';
import { ActivatedRoute } from '@angular/router';
import { MisListasService } from '../../services/mis-listas.service';
import { myList } from '../../models/my-list.interface';

@Component({
  selector: 'app-serie-details',
  templateUrl: './serie-details.component.html',
  styleUrl: './serie-details.component.css'
})
export class SerieDetailsComponent implements OnInit {

  add: boolean = false;
  
  seriesDetails: SerieDetaisResponse | undefined;
  seasonsId: Season[] = [];
  seasons: SeasonDetailsResponse[] = [];
  selectedSeason: SeasonDetailsResponse | undefined;
  rating: number = 0;
  listas: myList[] = [];

  episodesToShow: number = 20;
  incrementBy: number = 20;



  constructor(private detailsService: DetailsService, private route: ActivatedRoute, private myListService: MisListasService) { }

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
    }

    this.myListService.getListas().subscribe(response => {
      this.listas = response.results;

    })

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

  loadMoreEpisodes() {
    this.episodesToShow += this.incrementBy;
    }


}
