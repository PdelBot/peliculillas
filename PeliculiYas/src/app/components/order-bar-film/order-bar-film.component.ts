import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListService } from '../../services/list.service';
import { Film } from '../../models/film.interface';

@Component({
  selector: 'app-order-bar-film',
  templateUrl: './order-bar-film.component.html',
  styleUrl: './order-bar-film.component.css'
})
export class OrderBarFilmComponent {

  @Input() listado: Film[] = [];
  @Output() listadoChange = new EventEmitter<Film[]>();

  constructor(private listService: ListService) { }

  ordenar(criterio: string) {
    switch (criterio) {
      case 'popularidadAscendente':
        this.listService.getPopularFilmAsc().subscribe(response => {
          this.listado = response.results;
          this.listadoChange.emit(this.listado);
        });
        break;
      case 'popularidadDescendente':
        this.listService.getPopularFilmDesc().subscribe(response => {
          this.listado = response.results;
          this.listadoChange.emit(this.listado);
        });
        break;
      case 'valoracionAscendente':
        this.listService.getRatedFilmAsc().subscribe(response => {
          this.listado = response.results;
          this.listadoChange.emit(this.listado);
        });
        break;
      case 'valoracionDescendente':
        this.listService.getRatedFilmDesc().subscribe(response => {
          this.listado = response.results;
          this.listadoChange.emit(this.listado);
        });
        break;
      default:
        console.error('Criterio de ordenación no reconocido:', criterio);
    }
  }
}
