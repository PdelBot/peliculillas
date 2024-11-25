import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { FavoriteFilmResponse, FilmFavorite } from '../../models/favorite-list.interface';
import { Film } from '../../models/film.interface';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrl: './favorite-list.component.css'
})
export class FavoriteListComponent implements OnInit {

  favouriteFilms: FilmFavorite[] = [];
  constructor(private listService: ListService) { }

  ngOnInit(): void {
    this.listService.getFavouriteFilms().subscribe((response) => {
      this.favouriteFilms = response.results;
    });
  }

  getFullImagePath(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${posterPath}`;
  }
}
