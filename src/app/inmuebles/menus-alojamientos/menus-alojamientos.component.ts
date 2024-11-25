import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AlojamientosService} from '../alojamientos.service';
import { LoginserviceService } from '../../login/loginservice.service';

@Component({
  selector: 'app-menus-alojamientos',
  templateUrl: './menus-alojamientos.component.html',
  styleUrl: './menus-alojamientos.component.css'
})
export class MenusAlojamientosComponent {
  alojamientos: any[] = [];
  userRole: string | null = '';
  searchText: string = '';

  constructor(private alojamientoService: AlojamientosService, private router: Router, private loginService: LoginserviceService) {}

  ngOnInit() {
    this.userRole = this.loginService.getUserRole();
    this.alojamientoService.obtenerAlojamientos().subscribe(
      (data) => {
        this.alojamientos = data;
      },
      (error) => {
        console.error('Error al obtener:', error);
      }
    )
  }

  get filteredAlojamientos() {
    if (!this.searchText.trim()) {
      return this.alojamientos;
    }
    return this.alojamientos.filter(data =>
      data.nombre_inmueble.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  agregar(){
    this.router.navigate(['inmuebles/agregar'])
  }
}
