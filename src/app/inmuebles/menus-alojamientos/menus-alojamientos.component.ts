import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlojamientosService } from '../inmueble.service';
import { CaracteristicasService } from '../caracteristicas.service';
import { LoginserviceService } from '../../login/loginservice.service';

@Component({
  selector: 'app-menus-alojamientos',
  templateUrl: './menus-alojamientos.component.html',
  styleUrls: ['./menus-alojamientos.component.css']
})
export class MenusAlojamientosComponent implements OnInit {
  alojamientos: any[] = [];
  servicios: any[] = [];
  userRole: string | null = '';
  searchText: string = '';
  selectedServicio: string = '';

  constructor(
    private alojamientoService: AlojamientosService,
    private caracteristicasService: CaracteristicasService,
    private router: Router,
    private loginService: LoginserviceService
  ) {}

  ngOnInit() {
    this.userRole = this.loginService.getUserRole();

    this.alojamientoService.obtenerAlojamientos().subscribe(
      (data) => {
        this.alojamientos = data;
      },
      (error) => {
        console.error('Error al obtener los alojamientos:', error);
      }
    );

    this.caracteristicasService.getServicios().subscribe(
      (data) => {
        this.servicios = data;
      },
      (error) => {
        console.error('Error al obtener los servicios:', error);
      }
    );
  }

  get filteredAlojamientos() {
    let resultados = this.alojamientos;
    if (this.searchText.trim()) {
      resultados = resultados.filter((data) =>
        data.nombre_inmueble.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
    return resultados;
  }

  filtrarPorServicio() {
    if (this.selectedServicio) {
      this.alojamientoService.obtenerInmueblesPorServicio(this.selectedServicio).subscribe(
        (data) => {
          this.alojamientos = data; 
        },
        (error) => {  
          if (error.status === 404) {
            this.alojamientos = [];
          }
        }
      );
    }
  }  

  agregar() {
    this.router.navigate(['inmuebles/agregar']);
  }
}
