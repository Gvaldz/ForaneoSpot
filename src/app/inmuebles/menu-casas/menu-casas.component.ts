import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AlojamientosService} from '../alojamientos.service';
import {data} from 'autoprefixer';

@Component({
  selector: 'app-menu-casas',
  templateUrl: './menu-casas.component.html',
  styleUrl: './menu-casas.component.css'
})
export class MenuCasasComponent {
  casas: any[]=[];
  searchText: string = '';
  constructor(private router: Router, private alojamientosService: AlojamientosService) {
  }

  ngOnInit() {
    this.alojamientosService.obtenerCasas().subscribe(
      (data)=>{
        this.casas = data;
      },
      (error) => {
        console.error('Error al obtener:', error);
      }
    )
  }

  get filteredCasas() {
    // Si no hay texto de búsqueda, muestra todas las comidas
    if (!this.searchText.trim()) {
      return this.casas;
    }
    // Filtra comidas según el nombre
    return this.casas.filter(data =>
      data.nombre_inmueble.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
