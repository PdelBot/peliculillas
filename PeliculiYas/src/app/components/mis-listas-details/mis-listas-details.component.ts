import { Component, HostListener, OnInit } from '@angular/core';
import { MisListasService } from '../../services/mis-listas.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { myListResponse } from '../../models/my-list.interface';
import { myListDetailsResponse } from '../../models/my-list-details.interface';
import { FilmDetailsResponse } from '../../models/film-details.interface';
import { SerieDetailsComponent } from '../serie-details/serie-details.component';
import { DetailsService } from '../../services/details.service';

@Component({
  selector: 'app-mis-listas-details',
  templateUrl: './mis-listas-details.component.html',
  styleUrl: './mis-listas-details.component.css'
})
export class MisListasDetailsComponent implements OnInit {

  userName = '';
  userPhoto = '';
  banner: string = "/q8eejQcg1bAqImEV8jh8RtBD4uH.jpg";
  private prevScrollPos: number = window.scrollY;
  list: myListDetailsResponse | undefined;
  filmList: FilmDetailsResponse[] = [];
  serieList: SerieDetailsComponent[] = [];
  idList: string = "";
  editar: boolean = false;
  newName: string = "";
  newDescription: string = "";




  constructor(private authService: AuthService, private mylistService: MisListasService,
    private route: ActivatedRoute, private serieService: DetailsService) { }



  ngOnInit(): void {
    this.userName = localStorage.getItem('user_name') ?? '';
    this.userPhoto = localStorage.getItem('user_photo')
      ? `https://image.tmdb.org/t/p/original${localStorage.getItem(
        'user_photo'
      )}`
      : '';

    this.idList = this.route.snapshot.paramMap.get('id')!;

    if (this.idList) {
      this.mylistService.getDetailsList(this.idList).subscribe(response => {
        this.list = response;
        this.newName = response.name;
        this.newDescription = response.description;
      });


    }


  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const currentScrollPos = window.scrollY;
    const navElement = document.getElementById('navbar');

    if (navElement) {
      if (this.prevScrollPos > currentScrollPos) {
        navElement.style.top = '0'; // Mostrar el menú
      } else {
        navElement.style.top = '-100px'; // Ocultar el menú
      }
    }

    this.prevScrollPos = currentScrollPos;



  }


  createRequestToken() {
    this.authService.createRequestToken().subscribe((response) => {
      localStorage.setItem('token', response.request_token);

      // STEP 2 de la autenticación en TMDB (firma del token iniciando sesión en TMDB)
      window.location.href = `https://www.themoviedb.org/authenticate/${response.request_token}?redirect_to=http://localhost:4200/approved`;
    });
  }

  isLoggedIn() {
    return localStorage.getItem('logged_in') === 'true';
  }

  logout() {
    localStorage.clear();
    window.location.href = 'http://localhost:4200';
  }

  verificarImg() {
    const partes: string[] = this.userPhoto.split("/").filter(part => part !== '');

    if (partes[partes.length - 1] === "originalnull") {
      this.userPhoto = "https://static.wikia.nocookie.net/mamarre-estudios-espanol/images/9/9f/Benjamin.png/revision/latest?cb=20201222175350&path-prefix=es"
    }
    return this.userPhoto;

  }

  bannerImg() {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${this.banner}`;
  }

  delete(idFilm: number, id: number, type: string) {
    return this.mylistService.delete(idFilm, id, type).subscribe(response => {
      console.log('borrado correctamente', response);
      this.mylistService.getDetailsList(this.idList).subscribe(response => {
        this.list = response;
      });
    }
    )
  }

  getFullImagePath(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${posterPath}`;
  }

  editarListaOn() {
    if (this.editar) {
      this.editar = false;
    } else {
      this.editar = true;
    }
  }

  setList() {
    this.mylistService.setList(this.newName, this.newDescription, this.list!.id).subscribe(response => {
      console.log(this.newName + " " + this.newDescription)
      window.location.reload()
    })


  }
}
