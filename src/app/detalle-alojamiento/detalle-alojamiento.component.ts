import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlojamientosService } from '../inmuebles/inmueble.service';

@Component({
  selector: 'app-detalle-alojamiento',
  templateUrl: './detalle-alojamiento.component.html',
  styleUrls: ['./detalle-alojamiento.component.css']
})
export class DetalleAlojamientoComponent implements OnInit {
  alojamiento: any; // Variable para almacenar los datos del alojamiento
  tipoInmueble: string | null = ''; // Tipo del inmueble (Casa, Edificio, Unidad)
  loading: boolean = true; // Indicador para mostrar carga

  constructor(
    private route: ActivatedRoute,
    private inmuebleService: AlojamientosService
  ) {}

  ngOnInit(): void {
    // Obtener el ID del alojamiento y el tipo de inmueble desde la ruta
    const id = this.route.snapshot.paramMap.get('id');
    this.tipoInmueble = this.route.snapshot.queryParamMap.get('tipo');
    
    if (id && this.tipoInmueble) {
      // Llamar al servicio con el ID y tipo de inmueble
      this.inmuebleService.getInmueblePorId(this.tipoInmueble, parseInt(id, 10))
        .subscribe({
          next: (data) => {
            this.alojamiento = data;
            this.loading = false; // Termina la carga cuando se obtiene la información
          },
          error: (err) => {
            console.error('Error al obtener el alojamiento:', err);
            this.loading = false; // Termina la carga incluso si hay error
          }
        });
    } else {
      console.error('Faltan parámetros: ID o tipo de inmueble');
      this.loading = false; // Termina la carga si faltan los parámetros
    }
  }
}
