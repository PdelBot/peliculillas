import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DetailsService } from '../../services/details.service';
import { FilmDetailsResponse } from '../../models/film-details.interface';
import { Cast, Crew } from '../../models/film-credits.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TrailerDetailsResponse } from '../../models/trailer-details.interface';

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


  constructor(private detailsService: DetailsService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const filmId = 912649;



    this.detailsService.getFilmdeatils(filmId, 'es-ES').subscribe(data => {
      if (data.overview) {
        this.film = data;
        this.rating = (this.film.vote_average || 0) / 2; 
      } else {
        this.detailsService.getFilmdeatils(filmId, 'en-US').subscribe(englishData => {
          this.film = englishData;
        });
      }
    });

    this.detailsService.getFilmCredits(filmId).subscribe(filmCreditsCast => {
      this.listCast = filmCreditsCast.cast;


    });



  }

  watchTrailer() {
    this.detailsService.getTrailer(912649).subscribe(data => {
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


  
  

}


