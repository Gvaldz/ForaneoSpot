import { Component, Input } from '@angular/core';
import {VendedorService} from '../../vendedor.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-opiniones-comida',
  templateUrl: './opiniones-comida.component.html',
  styleUrl: './opiniones-comida.component.css'
})
export class OpinionesComidaComponent {
  @Input() vendedorId!: number;
  opiniones: any[] = [];
  calificacionPromedio: number = 0;
  isLoading: boolean = true;

  constructor(private vendedorService: VendedorService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Verifica que el vendedorId no sea NaN y es válido
    console.log("Vendedor ID:", this.vendedorId);  // Verifica el valor de vendedorId

    if (isNaN(this.vendedorId) || this.vendedorId <= 0) {
      console.error('Vendedor ID no válido:', this.vendedorId);
      return;  // Si el ID no es válido, no hacemos la solicitud
    }

    // Llama al método que obtiene las opiniones, pasándole el vendedorId
    this.obtenerOpiniones(this.vendedorId);

    if (isNaN(this.vendedorId) || this.vendedorId <= 0) {
      console.error('Vendedor ID no válido:', this.vendedorId);
      return;
    }

    this.obtenerOpiniones(this.vendedorId);
  }

  obtenerOpiniones(vendedorId: number): void {
    this.vendedorService.getOpiniones(this.vendedorId).subscribe(
      (data) => {
        this.opiniones = data; // Almacenar las opiniones obtenidas
        this.calificarVendedor();
      },
      (error) => {
        console.error('Error al obtener las opiniones:', error);
      }
    );
  }

  calificarVendedor(): void {
    if (this.opiniones.length > 0) {
      const sumaCalificaciones = this.opiniones.reduce((acc, opinion) => acc + opinion.calificacion, 0);
      this.calificacionPromedio = sumaCalificaciones / this.opiniones.length;
    } else {
      this.calificacionPromedio = 0; // Si no hay opiniones, el promedio es 0
    }
  }

}
