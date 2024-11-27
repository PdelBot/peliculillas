import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Film } from '../../models/film.interface';
import { ListService } from '../../services/list.service';
import { Serie } from '../../models/serie.interface';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css'
})
export class MenuLateralComponent implements OnInit {

  isOpen: boolean = false;

  altura: number = 1780;

  @Input() tipo: 'peliculas' | 'series' = 'peliculas';
  listadoPeliculas: Film[] = [];
  listadoSeries: Serie[] = [];
  @Output() listadoChange = new EventEmitter<Film[] | Serie[]>();


  constructor(private listService: ListService) { }

  ngOnInit() {
    this.cargarListado();
  }

  cargarListado() {
    if (this.tipo === 'peliculas') {
      this.listService.getPopularFilmDesc().subscribe(response => {
        this.listadoPeliculas = response.results;
        this.listadoChange.emit(this.listadoPeliculas);
      });
    } else {
      this.listService.getPopularSeriesDesc().subscribe(response => {
        this.listadoSeries = response.results;
        this.listadoChange.emit(this.listadoSeries);
      });
    }
  }

  actualizarListadoPeliculas(nuevoListado: Film[]) {
    this.listadoPeliculas = nuevoListado;
    this.listadoChange.emit(this.listadoPeliculas);
  }

  actualizarListadoSeries(nuevoListado: Serie[]) {
    this.listadoSeries = nuevoListado;
    this.listadoChange.emit(this.listadoSeries);
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
