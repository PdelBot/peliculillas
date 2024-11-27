import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Film } from '../../models/film.interface';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css'
})
export class MenuLateralComponent implements OnInit {

  isOpen: boolean = false;

  altura: number = 1780;

  listado: Film[] = [];
  @Output() listadoChange = new EventEmitter<Film[]>();

  constructor(private listService: ListService) { }

  ngOnInit() {
    this.listService.getPopularFilmDesc().subscribe(response => {
      this.listado = response.results;
      this.listadoChange.emit(this.listado);
    });
  }

  actualizarListado(nuevoListado: Film[]) {
    this.listado = nuevoListado;
    this.listadoChange.emit(this.listado);
  }
  desplegable() {
    this.isOpen = !this.isOpen;

    this.reajustar;
  }

  @HostListener('window:resize', ['$event'])
  reajustar(event: Event) {
    this.actualizarAltura(); // Actualiza la altura cuando cambia el tamaño de la ventana
  }

  actualizarAltura() {
    this.altura = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    );

    console.log(this.altura);
  }
}
