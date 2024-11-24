import { Component } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-dashboard-inicio',
  templateUrl: './dashboard-inicio.component.html',
  styleUrls: ['./dashboard-inicio.component.css']
})
export class DashboardInicioComponent {
  constructor(private router: Router) {} 
  navigateToLogin() {
    this.router.navigate(['/login']);  
  }

  navigateToRegister() {
    this.router.navigate(['/registrarUsuario']);  
  }
}
