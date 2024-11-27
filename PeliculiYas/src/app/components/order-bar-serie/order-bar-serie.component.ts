import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Serie } from '../../models/serie.interface';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-order-bar-serie',
  templateUrl: './order-bar-serie.component.html',
  styleUrl: './order-bar-serie.component.css'
})
export class OrderBarSerieComponent {

  @Input() listado: Serie[] = [];
  @Output() listadoChange = new EventEmitter<Serie[]>();

  constructor(private listService: ListService) { }

  ordenar(criterio: string) {
    switch (criterio) {
      case 'popularidadAscendente':
        this.listService.getPopularSeriesAsc().subscribe(response => {
          this.listado = response.results;
          this.listadoChange.emit(this.listado);
        });
        break;
      case 'popularidadDescendente':
        this.listService.getPopularSeriesDesc().subscribe(response => {
          this.listado = response.results;
          this.listadoChange.emit(this.listado);
        });
        break;
      case 'valoracionAscendente':
        this.listService.getRatedSeriesAsc().subscribe(response => {
          this.listado = response.results;
          this.listadoChange.emit(this.listado);
        });
        break;
      case 'valoracionDescendente':
        this.listService.getRatedSeriesDesc().subscribe(response => {
          this.listado = response.results;
          this.listadoChange.emit(this.listado);
        });
        break;
    }
  }
}
