import { Component, OnInit } from '@angular/core';
import {Route, Router} from '@angular/router';
import {AlojamientosService} from '../../alojamientos.service';

@Component({
  selector: 'app-menus-alojamientos',
  templateUrl: './menus-alojamientos.component.html',
  styleUrl: './menus-alojamientos.component.css'
})
export class MenusAlojamientosComponent {
  alojamientos: any[] = [];

  searchText: string = '';

  constructor(private alojamientoService: AlojamientosService, private router: Router) {}

  ngOnInit() {
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
    // Si no hay texto de búsqueda, muestra todas las comidas
    if (!this.searchText.trim()) {
      return this.alojamientos;
    }
    // Filtra comidas según el nombre
    return this.alojamientos.filter(data =>
      data.nombre_inmueble.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
