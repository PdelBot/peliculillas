import { Component, OnInit } from '@angular/core';
import { Serie } from '../../models/serie.interface';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-serie-list',
  templateUrl: './serie-list.component.html',
  styleUrl: './serie-list.component.css'
})
export class SerieListComponent implements OnInit {


  listadoSeries: Serie[] = [];

  constructor(private serieService: ListService) { }

  ngOnInit(): void {
    this.serieService.getSeries().subscribe((response) => {
      this.listadoSeries = response.results;
    });
  }
  getFullImagePath(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${posterPath}`;
  }


}
