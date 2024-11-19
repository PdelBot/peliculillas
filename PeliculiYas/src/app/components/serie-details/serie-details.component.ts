import { Component, OnInit } from '@angular/core';
import { DetailsService } from '../../services/details.service';
import { SerieDetaisResponse } from '../../models/series-details.interface';
import { SeasonDetailsResponse } from '../../models/season-details.interface';

@Component({
  selector: 'app-serie-details',
  templateUrl: './serie-details.component.html',
  styleUrl: './serie-details.component.css'
})
<<<<<<< HEAD
export class SerieDetailsComponent implements OnInit {

  seriesDetails: SerieDetaisResponse | undefined;
  seasons: SeasonDetailsResponse[] = [];


  constructor(private detailsService: DetailsService) { }

  ngOnInit(): void {

    this.detailsService.getSeriesDetails(124364, 'es-ES').subscribe(data => {
      if (data.overview) {
        this.seriesDetails = data;
      } else {
        this.detailsService.getSeriesDetails(124364, 'en-US').subscribe(englishData => {
          this.seriesDetails = englishData;
        });
      }
    });

    this.detailsService.getSeasonDetails(124364, 1, 'es-ES').subscribe(data => {
      this.seasons.push(data);
    });

  }
=======
export class SerieDetailsComponent {
>>>>>>> MaquetacionDetalles

}
