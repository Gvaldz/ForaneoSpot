import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { LoginserviceService } from '../../login/loginservice.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  showUserMenu = false;
  userRole: string | null = '';

  constructor(private router: Router, private loginService: LoginserviceService) {}

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  navigateEditar() {
    this.router.navigate(['/perfil']);
    this.showUserMenu = false;
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/home']);
    this.showUserMenu = false;
  }

  ngOnInit(): void{
    this.userRole = this.loginService.getUserRole();
  }

  navigateComida(){
    this.router.navigate(['/comida']);
  }
  navigateAlojamientos(){
    this.router.navigate(['/alojamientos']);
  }
  navigateCasas(){
    this.router.navigate(['/menuCasas']);
  }
  navigateEdificios(){
    this.router.navigate(['/menuEdificios']);
  }
  navigateVendedores(){
    this.router.navigate(['/vendedores']);
  }
  navigateVendedoresFavoritos(){
    this.router.navigate(['/favoritos']);
  }

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  navigateFAQ(){
    console.log("FAQ")
    this.router.navigate(['/guia']);
  }
}
