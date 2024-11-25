import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AlojamientosService} from '../../alojamientos.service';
import {data} from 'autoprefixer';

@Component({
  selector: 'app-menu-casas',
  templateUrl: './menu-casas.component.html',
  styleUrl: './menu-casas.component.css'
})
export class MenuCasasComponent {
  casas: any[]=[];
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
}
