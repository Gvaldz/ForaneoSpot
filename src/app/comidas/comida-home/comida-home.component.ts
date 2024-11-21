import { Component } from '@angular/core';
import {OnInit} from '@angular/core';
import {ComidaService} from '../comida.service';

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
        console.log('Datos obtenidos:', data);
        this.comidas = data; 
      },
      (error) => {
        console.error('Error al obtener las comidas:', error);
      }
    );
  }
}
