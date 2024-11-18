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
  num: number = 1;

  

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

  getNextPage() {
    this.num += 1;
    this.listadoActores = [];
    this.peopleService.getActorPage(this.num).subscribe((response) => {
      this.listadoActores = response.results;
    });
  }
  getLastPage() {
    this.num -= 1;
    this.listadoActores = [];
    this.peopleService.getActorPage(this.num).subscribe((response) => {
      this.listadoActores = response.results;
    });
  }
}
