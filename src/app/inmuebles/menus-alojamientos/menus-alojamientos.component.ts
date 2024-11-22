import { Component } from '@angular/core';
import {OnInit} from '@angular/core';
import {AlojamientosService} from '../../alojamientos.service';

@Component({
  selector: 'app-menus-alojamientos',
  templateUrl: './menus-alojamientos.component.html',
  styleUrl: './menus-alojamientos.component.css'
})
export class MenusAlojamientosComponent {
  alojamientos: any[]=[]

  constructor(private alojamientosService: AlojamientosService) {
  }

  ngOnInit(): void {
    this.alojamientosService.obtenerAlojamientos().subscribe(
      (data) => {
        this.alojamientos = data; // Guardar los datos obtenidos en el array comidas
      },
      (error) => {
        console.error('Error al obtener:', error);
      }
    );
  }
}
