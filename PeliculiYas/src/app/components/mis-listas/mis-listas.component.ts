import { Component, HostListener, input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MisListasService } from '../../services/mis-listas.service';
import { myList } from '../../models/my-list.interface';
import { filmList, myListDetailsResponse } from '../../models/my-list-details.interface';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-mis-listas',
  templateUrl: './mis-listas.component.html',
  styleUrl: './mis-listas.component.css'
})
export class MisListasComponent implements OnInit {

  create: boolean = false;
  delet: boolean = false;
  clear: boolean = false;
  misListas: myList[] = [];
  nameList: string = ""
  description: string = ""
  userName = '';
  userPhoto = '';
  banner: string = "/q8eejQcg1bAqImEV8jh8RtBD4uH.jpg";
  listDetails: myListDetailsResponse | undefined;
  selectedListId: number = -1;
  existe: boolean = false;
  items: filmList[] = [];
  lista: myListDetailsResponse | undefined;
  

  constructor(private authService: AuthService, private mylistService: MisListasService) { }
  ngOnInit(): void {
    this.userName = localStorage.getItem('user_name') ?? '';
    this.userPhoto = localStorage.getItem('user_photo')
      ? `https://image.tmdb.org/t/p/original${localStorage.getItem(
        'user_photo'
      )}`
      : '';

      this.verificarImg()


    this.mylistService.getListas().subscribe((response) => {
      this.misListas = response.results;
    });
    


  }

  private prevScrollPos: number = window.scrollY;

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


  recargarListas(){
    this.mylistService.getListas().subscribe((response) => {
      this.misListas = response.results;
    });
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
    console.log(this.userPhoto)

    if (partes[partes.length - 1] === "originalnull") {
      this.userPhoto = "https://static.wikia.nocookie.net/mamarre-estudios-espanol/images/9/9f/Benjamin.png/revision/latest?cb=20201222175350&path-prefix=es"
    }
    return this.userPhoto;

  }

  bannerImg() {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${this.banner}`;
  }

 

  createList() {
    this.misListas.forEach(lista => {
      if(this.nameList.toLowerCase() === lista.name.toLowerCase()){
        this.existe = true;
        this.showToast("El nombre de la lista ya existe")
        this.recargarListas();
      }
    });
    if (this.existe === false){
      this.mylistService.createList(this.nameList, this.description).subscribe(response => {
        console.log('hola', response)
        this.recargarListas();
        this.showToast('Se ha creado la lista correctamente')
      }
      );
    }
    
  }

  deleteList(id: number) {
    this.mylistService.deleteList(id).subscribe(response => {
      console.log('borrate', response);     
      this.recargarListas();
      this.showToast('Se ha borrado la lista correctamente')
    });
  }

  clearList(id: number) {
    this.mylistService.clearList(id).subscribe(response => {
      console.log('limpiar', response);
      this.showToast('Se ha limpiado la lista correctamente')
    })
  }

  getImgBackground(id: number): string {
    const idList = id.toString();

    this.mylistService.getDetailsList(idList).subscribe(response => {
      this.listDetails = response;
    })

    const background = this.listDetails?.items[0].backdrop_path;

    const baseUrl = 'https://image.tmdb.org/t/p/w500';

    return `${baseUrl}${background}`;

  }

  

  
  
  

  getFullImg(poster: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    if (!poster) {
      console.warn('Poster path vacío o indefinido.');
      return 'assets/default-image.jpg'; // Opcional: imagen por defecto
    }
    return `${baseUrl}${poster}`;
  }

  showToast(message: string) {
    const toastMessage = document.getElementById('toastMessage');
    if (toastMessage) {
      toastMessage.textContent = message;
    }

    const toastElement = document.getElementById('favToast');
    if (toastElement) {
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }
  }
  
  
  
  
 
}
