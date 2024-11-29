import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DetailsService } from '../../services/details.service';
import { FilmDetailsResponse } from '../../models/film-details.interface';
import { Cast, Crew } from '../../models/film-credits.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TrailerDetailsResponse } from '../../models/trailer-details.interface';
import { ActivatedRoute } from '@angular/router';
import { myList, myListResponse } from '../../models/my-list.interface';
import { MisListasService } from '../../services/mis-listas.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrl: './film-details.component.css'
})
export class FilmDetailsComponent implements OnInit {

  add: boolean = false;
  trailerUrl: SafeResourceUrl | null = null;
  checkedLists: { [key: number]: boolean } = {};
  listas: myList[] = [];
  trailer: TrailerDetailsResponse | undefined;
  film: FilmDetailsResponse | undefined;
  listCast: Cast[] = [];
  listCrew: Crew[] = [];
  rating: number = 0;
  check: boolean = false;


  constructor(private detailsService: DetailsService, private sanitizer: DomSanitizer, private route: ActivatedRoute, private myListService: MisListasService
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

      this.myListService.getListas().subscribe(response => {
        this.listas = response.results;

        this.listas.forEach((list) => {
          this.myListService.getDetailsList(list.id.toString()).subscribe((response) => {
            const isInList = response.items.some((item: any) => item.id === this.film!.id);
            this.checkedLists[list.id] = isInList;
          });
        });
      })

      

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




  onCheckboxChange(event: Event, listId: number): void {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.checked) {
      this.myListService.addFilm(this.film!.id, listId).subscribe(() => {
        console.log(`Película añadida a la lista ${listId}`);
        this.checkedLists[listId] = true; // Actualiza el estado local
      });
    } else{
      this.myListService.deleteFilm(this.film!.id, listId).subscribe(() => {
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

