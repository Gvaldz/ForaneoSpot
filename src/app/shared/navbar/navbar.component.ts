import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router) {}

  navigateEditar(){
    this.router.navigate(['/editarPerfil']);
  }
  navigateComida(){
    this.router.navigate(['/comida']);
  }
  navigateAlojamientos(){
    this.router.navigate(['/alojamientos']);
  }
  navigateCuartos(){
    this.router.navigate(['/menuCuartos']);
  }
  navigateEdificios(){
    this.router.navigate(['/menuEdificios']);
  }
}
