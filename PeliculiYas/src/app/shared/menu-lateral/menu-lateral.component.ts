import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Film } from '../../models/film.interface';
import { ListService } from '../../services/list.service';
import { Serie } from '../../models/serie.interface';
import { Genre } from '../../models/genre.interface';


@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css'
})
export class MenuLateralComponent implements OnInit {

  isOpen: boolean = false;

  altura: number = 1780;

  @Input() tipo: 'peliculas' | 'series' | 'actores' = 'peliculas';
  listadoPeliculas: Film[] = [];
  listadoSeries: Serie[] = [];
  generosSelecionados: number[] = [];
  generos: Genre[] = [];
  listadoPeliculasFiltrado: Film[] = [];
  listadoSeriesFiltrado: Serie[] = [];
  @Output() listadoFilmChange = new EventEmitter<Film[]>();
  @Output() listadoSeriesChange = new EventEmitter<Serie[]>();



  constructor(private listService: ListService) { }

  ngOnInit() {
    this.cargarGeneros();
    this.buscar('popularity.desc', 1);
  }

  cargarGeneros() {
    if (this.tipo === 'peliculas') {
      this.listService.getFilmGenres().subscribe(response => {
        this.generos = response.genres;
      });
    } else if (this.tipo === 'series') {
      this.listService.getSeriesGenres().subscribe(response => {
        this.generos = response.genres;
      });
    }
  }

  buscar(criterio: string, page: number = 1) {
    if (this.tipo === 'peliculas') {
      this.listService.getOrderedFilms(criterio, this.generosSelecionados, page).subscribe(response => {
        this.listadoPeliculas = response.results;
        this.listadoFilmChange.emit(this.listadoPeliculas);
      });
    } else if (this.tipo === 'series') {
      this.listService.getOrderedSeries(criterio, this.generosSelecionados, page).subscribe(response => {
        this.listadoSeries = response.results;
        this.listadoSeriesChange.emit(this.listadoSeries);
      });
    }
  }

  toggleGenre(id: number) {
    const index = this.generosSelecionados.indexOf(id);
    if (index > -1) {
      this.generosSelecionados.splice(index, 1);
    } else {
      this.generosSelecionados.push(id);
    }
  }

  changePage(page: number, criterio: string) {
    this.buscar(criterio, page);
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
