import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DetailsService } from '../../services/details.service';
import { FilmDetailsResponse } from '../../models/film-details.interface';
import { Cast, Crew } from '../../models/film-credits.interface';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrl: './film-details.component.css'
})
export class FilmDetailsComponent implements OnInit {

  film: FilmDetailsResponse | undefined;
  listCast: Cast[] = [];
  listCrew: Crew[]= [];

  constructor(private detailsService: DetailsService) { }

  ngOnInit(): void {
    const filmId = 912649;


    this.detailsService.getFilmCredits(filmId).subscribe(filmCreditsCast => {
      this.listCast = filmCreditsCast.filmCast;
      this.listCrew = filmCreditsCast.filmCrew;
      console.log(this.listCast);
    });

    this.detailsService.getFilmdeatils(filmId, 'es-ES').subscribe(data => {
      if (data.overview) {
        this.film = data;
      } else {
        this.detailsService.getFilmdeatils(filmId, 'en-US').subscribe(englishData => {
          this.film = englishData;
        });
      }
    });



  }

  getImgUrl(path: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${path}`;
  }


}
