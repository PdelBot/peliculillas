import { Component, OnInit } from '@angular/core';
import { DetailsService } from '../../services/details.service';
import { PeopleDetailsResponse } from '../../models/people-details.interface';
import { Cast, CombinedCreditsResponse, Crew } from '../../models/combined-credits.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-people-details',
  templateUrl: './people-details.component.html',
  styleUrl: './people-details.component.css'
})
export class PeopleDetailsComponent implements OnInit {
  person: PeopleDetailsResponse | undefined;
  listCrew: Crew[] = [];
  listCast: Cast[] = [];

  constructor(private detailsService: DetailsService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    const personId = this.route.snapshot.paramMap.get('id');

    if (personId) {
      this.detailsService.getPeopleDetails(+personId).subscribe((response) => {
        this.person = response;
      });

      this.detailsService.getPeopleDetails(+personId).subscribe(data => {
        if (data.biography) {
          this.person = data;
        } else {
          this.detailsService.getPeopleDetails(+personId).subscribe(englishData => {
            this.person = englishData;
          });
        }
      });

      this.detailsService.getPeopleCredits(+personId).subscribe(data => {
        this.listCrew = data.crew;
        this.listCast = data.cast;
      });
    }
  }




  getImgUrl(path: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${path}`;
  }
}
