import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Film } from '../../models/film.interface';
import { ListService } from '../../services/list.service';
import { Serie } from '../../models/serie.interface';
import { Genre } from '../../models/genre.interface';
import { Router } from '@angular/router';


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
  currentSort = 'popularity.desc';
  currentPage = 1;



  constructor(private listService: ListService,  private router: Router) { }

 
  ngOnInit() {
    this.cargarGeneros();
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

  buscar(sort: string, page: number) {
    this.currentSort = sort;
    this.currentPage = page;

    if (this.tipo === 'peliculas') {
      this.listService.getAllFilteredFilms(sort, this.generosSelecionados).subscribe((data: Film[]) => {
        this.listadoPeliculas = data;
        this.aplicarFiltros();
        this.router.navigate(['/filtered-results'], { queryParams: { tipo: this.tipo, generos: this.generosSelecionados.join(','), sort: this.currentSort } });
      });
    } else if (this.tipo === 'series') {
      this.listService.getAllFilteredSeries(sort, this.generosSelecionados).subscribe((data: Serie[]) => {
        this.listadoSeries = data;
        this.aplicarFiltros();
        this.router.navigate(['/filtered-results'], { queryParams: { tipo: this.tipo, generos: this.generosSelecionados.join(','), sort: this.currentSort } });
      });
    }
  }

  aplicarFiltros() {
    if (this.tipo === 'peliculas') {
      this.listadoPeliculasFiltrado = this.listadoPeliculas.filter(pelicula => 
        this.generosSelecionados.length === 0 || this.generosSelecionados.includes(pelicula.genre_ids[0])
      );
      this.listadoFilmChange.emit(this.listadoPeliculasFiltrado);
    } else if (this.tipo === 'series') {
      this.listadoSeriesFiltrado = this.listadoSeries.filter(serie => 
        this.generosSelecionados.length === 0 || this.generosSelecionados.includes(serie.genre_ids[0])
      );
      this.listadoSeriesChange.emit(this.listadoSeriesFiltrado);
    }
  }

  toggleGenre(generoId: number) {
    const index = this.generosSelecionados.indexOf(generoId);
    if (index > -1) {
      this.generosSelecionados.splice(index, 1);
    } else {
      this.generosSelecionados.push(generoId);
    }
  }

  onPageChange(page: number) {
    this.buscar(this.currentSort, page);
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
