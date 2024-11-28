import { Component, HostListener, input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ListService } from '../../services/list.service';
import { MisListasService } from '../../services/mis-listas.service';
import { myList, myListResponse } from '../../models/my-list.interface';
import { myListDetailsResponse } from '../../models/my-list-details.interface';

@Component({
  selector: 'app-mis-listas',
  templateUrl: './mis-listas.component.html',
  styleUrl: './mis-listas.component.css'
})
export class MisListasComponent implements OnInit {


  misListas: myList[] = [];
  nameList: string = "Nueva lista"
  description: string = "NO HAY"
  userName = '';
  userPhoto = '';
  banner: string = "/q8eejQcg1bAqImEV8jh8RtBD4uH.jpg";  
  listDetails: myListDetailsResponse | undefined;

  constructor(private authService: AuthService, private mylistService: MisListasService) { }
  ngOnInit(): void {
  this.userName = localStorage.getItem('user_name') ?? '';
    this.userPhoto = localStorage.getItem('user_photo')
      ? `https://image.tmdb.org/t/p/original${localStorage.getItem(
          'user_photo'
        )}`
      : '';

      this.mylistService.getListas().subscribe((response)=>{
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

  verificarImg(){
    const partes: string[] = this.userPhoto.split("/").filter(part => part !== '');
    
    if(partes[partes.length-1]==="originalnull"){
      this.userPhoto = "https://static.wikia.nocookie.net/mamarre-estudios-espanol/images/9/9f/Benjamin.png/revision/latest?cb=20201222175350&path-prefix=es"
    }
      return this.userPhoto;
 
  }

  bannerImg() {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${this.banner}`;
    }

  createList (){
    
      this.mylistService.createList(this.nameList, this.description).subscribe(response =>{
        console.log('hola', response)
        window.location.reload();
      }
      ) ;
  }

  deleteList(id: number) {
    this.mylistService.deleteList(id).subscribe(response=>{
      console.log('borrate', response);
      window.location.reload();
    });
    }

  clearList(id:number){
    this.mylistService.clearList(id).subscribe(response =>{
      console.log('limpiar', response);
      window.location.reload();
    })
  }

  getImgBackground(id: number): string{
    const idList = id.toString();

    this.mylistService.getDetailsList(idList).subscribe(response => {
      this.listDetails = response;
    })

    const background = this.listDetails?.items[0].backdrop_path;

    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    
    

    return `${baseUrl}${background}`;
    
  }

}
