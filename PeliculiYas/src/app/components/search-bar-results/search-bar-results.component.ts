import { Component, OnInit } from '@angular/core';
import { Film } from '../../models/film.interface';
import { Serie } from '../../models/serie.interface';
import { Actor } from '../../models/people.interface';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-search-bar-results',
  templateUrl: './search-bar-results.component.html',
  styleUrl: './search-bar-results.component.css'
})
export class SearchBarResultsComponent implements OnInit {

  query: string = '';
  peliculas: Film[] = [];
  series: Serie[] = [];
  actores: Actor[] = [];
  
  constructor(private route: ActivatedRoute, private listService: ListService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'] || '';
      if (this.query) {
        this.listService.searchMovies(this.query).subscribe(response => {
          this.peliculas = response.results;
        });
        this.listService.searchSeries(this.query).subscribe(response => {
          this.series = response.results;
        });
        this.listService.searchPeople(this.query).subscribe(response => {
          this.actores = response.results;
        });
      }
    });
  }
  getFullImagePath(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${posterPath}`;
  }
  getColor({ valoracion }: { valoracion: number }): { [key: string]: string } {
    return this.listService.getColorValoracion({ valoracion });
  }

}