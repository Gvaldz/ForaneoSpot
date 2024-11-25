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
}
