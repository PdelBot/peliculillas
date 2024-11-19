import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css'
})
export class MenuLateralComponent {
  isOpen: boolean = false;

  altura: number = 1780;

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