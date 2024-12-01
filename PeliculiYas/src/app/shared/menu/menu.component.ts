import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Language } from '../../models/language.interface';
import { LanguageSelectorService } from '../../services/language-selector.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  userName = '';
  userPhoto = '';
  languages: Language[] = [];
  selectedLanguage: string = '';
  query = '';


  constructor(private authService: AuthService, private languageService: LanguageSelectorService, private router : Router) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('user_name') ?? '';
    this.userPhoto = localStorage.getItem('user_photo')
      ? `https://image.tmdb.org/t/p/original${localStorage.getItem(
        'user_photo'
      )}`
      : '';
      this.languageService.getLanguages().subscribe(response => {
        this.languages = response;
      });
  
      this.languageService.selectedLanguage$.subscribe(language => {
        this.selectedLanguage = language;
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

  verificarImg() {
    const partes: string[] = this.userPhoto.split("/").filter(part => part !== '');

    if (partes[partes.length - 1] === "originalnull") {
      this.userPhoto = "https://static.wikia.nocookie.net/mamarre-estudios-espanol/images/9/9f/Benjamin.png/revision/latest?cb=20201222175350&path-prefix=es"
    }
    return this.userPhoto;

  }
 
  onLanguageChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const language = selectElement.value;
    this.languageService.setSelectedLanguage(language);
    console.log('Selected language:', this.selectedLanguage);
    window.location.reload();
    // Aquí puedes añadir la lógica para cambiar el idioma de la aplicación
  }

  search() {
    if (this.query.trim()) {
      this.router.navigate(['/search'], { queryParams: { query: this.query } });
    }
  }

}
