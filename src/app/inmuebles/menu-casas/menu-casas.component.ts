import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AlojamientosService} from '../inmueble.service';
import {data} from 'autoprefixer';
import { LoginserviceService } from '../../login/loginservice.service';
import { CaracteristicasService } from '../caracteristicas.service';

@Component({
  selector: 'app-menu-casas',
  templateUrl: './menu-casas.component.html',
  styleUrl: './menu-casas.component.css'
})
export class MenuCasasComponent {
  alojamientos: any[] = [];
  servicios: any[] = [];
  userRole: string | null = '';
  searchText: string = '';
  selectedServicio: string = '';
  minPrecio: number | null = null;
  maxPrecio: number | null = null;

  constructor(
    private alojamientoService: AlojamientosService,
    private caracteristicasService: CaracteristicasService,
    private router: Router,
    private loginService: LoginserviceService
  ) {}

  ngOnInit() {
    this.userRole = this.loginService.getUserRole();
    this.cargarAlojamientos();
    this.cargarServicios();
  }

  cargarAlojamientos() {
    this.alojamientoService.obtenerCasas().subscribe(
      (data) => {
        this.alojamientos = data;
      },
      (error) => {
        console.error('Error al obtener los alojamientos:', error);
      }
    );
  }

  cargarServicios() {
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
  
    if (this.searchText?.trim()) {
      resultados = resultados.filter((data) =>
        data.nombre_inmueble.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  
    if (this.minPrecio !== null) {
      resultados = resultados.filter((data) => data.renta >= this.minPrecio!);
    }
    if (this.maxPrecio !== null) {
      resultados = resultados.filter((data) => data.renta <= this.maxPrecio!);
    }
  
    return resultados;
  }

  filtrarPorServicio() {
    if (this.selectedServicio) {
      this.alojamientoService.obtenerCasasPorServicio(this.selectedServicio).subscribe(
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

  onInmuebleEliminado() {
    this.cargarAlojamientos(); 
  }

  agregar() {
    this.router.navigate(['inmuebles/agregar']);
  }
}
