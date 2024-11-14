import { Component } from '@angular/core';
import {OnInit} from '@angular/core';
import {ComidaService} from '../../comida.service';

@Component({
  selector: 'app-comida-home',
  templateUrl: './comida-home.component.html',
  styleUrl: './comida-home.component.css'
})
export class ComidaHomeComponent implements OnInit{
  comidas: any[] = [];

  constructor(private comidaService: ComidaService) {}

  ngOnInit(): void {
    this.comidaService.obtenerComidas().subscribe(
      (data) => {
        this.comidas = data; // Guardar los datos obtenidos en el array comidas
      },
      (error) => {
        console.error('Error al obtener las comidas:', error);
      }
    );
  }
}
