import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { LoginserviceService } from '../../login/loginservice.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  userRole: string | null = '';

  constructor(private router: Router, private loginService: LoginserviceService) {}

  ngOnInit(): void{
    this.userRole = this.loginService.getUserRole();
  }

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
