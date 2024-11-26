import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListService } from '../../services/list.service';
import { Film } from '../../models/film.interface';

@Component({
  selector: 'app-order-bar',
  templateUrl: './order-bar.component.html',
  styleUrl: './order-bar.component.css'
})
export class OrderBarComponent {

  @Input() listado: Film[] = [];
  @Output() listadoChange = new EventEmitter<Film[]>();

  constructor(private listService: ListService) { }
  
  ordenar(criterio: string) {
    switch (criterio) {
      case 'popularidadAscendente':
        this.listService.getPopularFilmAsc().subscribe(response => {
          this.listado = response.results;
        });
        break;
      case 'popularidadDescendente':
        this.listService.getPopularFilmDesc().subscribe(response => {
          this.listado = response.results;
        });
        break;
      case 'valoracionAscendente':
        this.listService.getRatedFilmAsc().subscribe(response => {
          this.listado = response.results;
        });
        break;
      case 'valoracionDescendente':
        this.listService.getRatedFilmDesc().subscribe(response => {
          this.listado = response.results;
        });
        break;
      default:
        console.error('Criterio de ordenación no reconocido:', criterio);
    }
  }
}
