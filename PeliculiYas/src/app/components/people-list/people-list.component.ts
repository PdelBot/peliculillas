import { Component } from '@angular/core';
import { Actor } from '../../models/people.interface';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrl: './people-list.component.css'
})
export class PeopleListComponent {

  listadoActores: Actor[] = [];
  page: number = 1;

  

  constructor(private peopleService: ListService) { }

  ngOnInit(): void {
    this.peopleService.getActors().subscribe((response) => {
      this.listadoActores = response.results;
    });
  }
  getFullImagePath(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${posterPath}`;
  }

  getPaginaUno() {
    this.page = 1;
    this.peopleService.getActorPage(this.page).subscribe((response) => {
      this.listadoActores = response.results;
    });
  }

  getNextPage() {
    this.page += 1;
    this.peopleService.getActorPage(this.page).subscribe((response) => {
      this.listadoActores = response.results;
    });
  }
  getLastPage() {
    this.page -= 1;
    this.peopleService.getActorPage(this.page).subscribe((response) => {
      this.listadoActores = response.results;
    });
  }
}
