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
  type: string = "";
  checkedLists: { [key: number]: boolean } = {};
  check: boolean = false;



  constructor(private detailsService: DetailsService, private route: ActivatedRoute, private myListService: MisListasService) { }

  ngOnInit(): void {
    const serieId = this.route.snapshot.paramMap.get('id');

    this.type = this.route.snapshot.url[0].path;
    if (this.type === "series"){
      this.type = "tv"
    }
    console.log(this.type)    

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

      this.listas.forEach((list) => {
        this.myListService.getDetailsList(list.id.toString()).subscribe((response) => {
          const isInList = response.items.some((item: any) => item.id === this.seriesDetails!.id);
          this.checkedLists[list.id] = isInList;
        });
      });
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

    onCheckboxChange(event: Event, listId: number): void {
      const inputElement = event.target as HTMLInputElement;
  
      if (inputElement.checked) {
        this.myListService.add(this.seriesDetails!.id, listId, this.type).subscribe(() => {
          console.log(`Película añadida a la lista ${listId}`);
          this.checkedLists[listId] = true; // Actualiza el estado local
        });
      } else{
        this.myListService.delete(this.seriesDetails!.id, listId, this.type).subscribe(() => {
          console.log(`Película eliminada de la lista ${listId}`);
          this.checkedLists[listId] = false; // Actualiza el estado local
        });
      }
    }
    
    onAdd() {
      if(!this.add){
        this.add = true;
      }else{
        this.add = false;
      }
    }
}
