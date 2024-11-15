import { Component, OnInit } from '@angular/core';
import { DetailsService } from '../../services/details.service';
import { PeopleDetailsResponse } from '../../models/people-details.interface';
import { Cast, CombinedCreditsResponse, Crew } from '../../models/combined-credits.interface';

@Component({
  selector: 'app-people-details',
  templateUrl: './people-details.component.html',
  styleUrl: './people-details.component.css'
})
export class PeopleDetailsComponent implements OnInit {
  person: PeopleDetailsResponse | undefined;
  listCrew: Crew[] = [];
  listCast: Cast[] = [];

  constructor(private detailsService: DetailsService) { }
  ngOnInit(): void {
    const personId = 2888; // ID de la persona que quieres obtener
    this.detailsService.getPeopleDetails(personId).subscribe(data => {
      this.person = data;
    });

    this.detailsService.getPeopleCredits(personId).subscribe(data => {
      this.listCrew = data.crew;
      this.listCast = data.cast;
    });
  }




    getImgUrl(path: string): string {
      const baseUrl = 'https://image.tmdb.org/t/p/w500';
      return `${baseUrl}${path}`;
    }
}
