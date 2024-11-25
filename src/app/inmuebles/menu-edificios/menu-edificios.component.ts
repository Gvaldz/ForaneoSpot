import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AlojamientosService} from '../../alojamientos.service';
import {data} from 'autoprefixer';

@Component({
  selector: 'app-menu-edificios',
  templateUrl: './menu-edificios.component.html',
  styleUrl: './menu-edificios.component.css'
})
export class MenuEdificiosComponent {
  edificios: any[] = [];

  constructor(private router: Router, private AlojamientosService: AlojamientosService) {}

  ngOnInit() {
    this.AlojamientosService.obtenerEdificios().subscribe(
      (data) => {
        this.edificios = data;
      },
      (error) => {
        console.error('Error al obtener:', error);
      }
    )
  }

}
