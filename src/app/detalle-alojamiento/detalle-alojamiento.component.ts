import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlojamientosService } from '../inmuebles/inmueble.service';

@Component({
  selector: 'app-detalle-alojamiento',
  templateUrl: './detalle-alojamiento.component.html',
  styleUrls: ['./detalle-alojamiento.component.css']
})
export class DetalleAlojamientoComponent implements OnInit {
  alojamiento: any = null; // Alojamiento que se mostrará
  tipoInmueble: string | null = ''; // Tipo de inmueble (Casa, Edificio, etc.)
  id: string | null = ''; // ID del alojamiento

  constructor(
    private route: ActivatedRoute, // Para acceder a los parámetros de la ruta
    private inmuebleService: AlojamientosService, // Para obtener los detalles del alojamiento
    private router: Router // Para la navegación entre páginas
  ) {}

  ngOnInit(): void {
    // Obtener el ID del alojamiento y el tipo de inmueble desde la URL
    this.id = this.route.snapshot.paramMap.get('id');
    this.tipoInmueble = this.route.snapshot.paramMap.get('tipo_inmueble');

    // Verificar que tenemos ambos parámetros antes de hacer la solicitud al servicio
    if (this.id && this.tipoInmueble) {
      this.inmuebleService.getInmueblePorId(this.tipoInmueble, parseInt(this.id, 10)).subscribe({
        next: (data) => {
          // Si la solicitud es exitosa, asignamos los datos del alojamiento
          this.alojamiento = data;
        },
        error: (err) => {
          // Manejo de errores si ocurre algo en la solicitud
          console.error('Error al obtener detalles del alojamiento:', err);
        },
      });
    } else {
      console.error('No se encontraron los parámetros necesarios (id o tipo).');
      // Redirigir o mostrar un mensaje si no tenemos los parámetros
      this.router.navigate(['/alojamientos']);
    }
  }

  volver(): void {
    // Redirigir a la lista de alojamientos
    this.router.navigate(['/alojamientos']);
  }
}