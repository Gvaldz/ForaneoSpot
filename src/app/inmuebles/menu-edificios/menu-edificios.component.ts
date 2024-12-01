import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AlojamientosService} from '../inmueble.service';
import {data} from 'autoprefixer';

@Component({
  selector: 'app-menu-edificios',
  templateUrl: './menu-edificios.component.html',
  styleUrl: './menu-edificios.component.css'
})
export class MenuEdificiosComponent {
  edificios: any[] = [];
  searchText: string = '';

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

  get filteredEdificios() {
    if (!this.searchText.trim()) {
      return this.edificios;
    }
    return this.edificios.filter(data =>
      data.nombre_inmueble.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

}
