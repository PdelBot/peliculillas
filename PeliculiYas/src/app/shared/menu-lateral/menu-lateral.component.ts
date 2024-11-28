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
  @Output() listadoFilmChange = new EventEmitter<Film[]>();
  @Output() listadoSeriesChange = new EventEmitter<Serie[]>();



  constructor(private listService: ListService) { }

  ngOnInit() {
    if (this.tipo === 'peliculas') {
      this.listService.getPopularFilmDesc().subscribe(response => {
        this.listadoPeliculas = response.results;
        this.listadoFilmChange.emit(this.listadoPeliculas);
      });
    } else {
      this.listService.getPopularSeriesDesc().subscribe(response => {
        this.listadoSeries = response.results;
        this.listadoSeriesChange.emit(this.listadoSeries);
      });
    }
  }

  ordenarPeliculas(criterio: string) {
    switch (criterio) {
      case 'popularidadAscendente':
        this.listService.getPopularFilmAsc().subscribe(response => {
          this.listadoPeliculas = response.results;
          this.listadoFilmChange.emit(this.listadoPeliculas);
        });
        break;
      case 'popularidadDescendente':
        this.listService.getPopularFilmDesc().subscribe(response => {
          this.listadoPeliculas = response.results;
          this.listadoFilmChange.emit(this.listadoPeliculas);
        });
        break;
      case 'valoracionAscendente':
        this.listService.getRatedFilmAsc().subscribe(response => {
          this.listadoPeliculas = response.results;
          this.listadoFilmChange.emit(this.listadoPeliculas);
        });
        break;
      case 'valoracionDescendente':
        this.listService.getRatedFilmDesc().subscribe(response => {
          this.listadoPeliculas = response.results;
          this.listadoFilmChange.emit(this.listadoPeliculas);
        });
        break;
      default:
        console.error('Criterio de ordenación no reconocido:', criterio);
    }
  }
  ordenarSeries(criterio: string) {
    switch (criterio) {
      case 'popularidadAscendente':
        this.listService.getPopularSeriesAsc().subscribe(response => {
          this.listadoSeries = response.results;
          this.listadoSeriesChange.emit(this.listadoSeries);
        });
        break;
      case 'popularidadDescendente':
        this.listService.getPopularSeriesDesc().subscribe(response => {
          this.listadoSeries = response.results;
          this.listadoSeriesChange.emit(this.listadoSeries);
        });
        break;
      case 'valoracionAscendente':
        this.listService.getRatedSeriesAsc().subscribe(response => {
          this.listadoSeries = response.results;
          this.listadoSeriesChange.emit(this.listadoSeries);
        });
        break;
      case 'valoracionDescendente':
        this.listService.getRatedSeriesDesc().subscribe(response => {
          this.listadoSeries = response.results;
          this.listadoSeriesChange.emit(this.listadoSeries);
        });
        break;
    }
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
