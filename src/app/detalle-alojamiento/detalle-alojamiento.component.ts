import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlojamientosService } from '../inmuebles/inmueble.service';
import { HttpClient } from '@angular/common/http';
import { LoginserviceService } from '../login/loginservice.service';

@Component({
  selector: 'app-detalle-alojamiento',
  templateUrl: './detalle-alojamiento.component.html',
  styleUrls: ['./detalle-alojamiento.component.css']
})
export class DetalleAlojamientoComponent implements OnInit {
  alojamiento: any = null; // Alojamiento que se mostrará
  tipoInmueble: string | null = ''; // Tipo de inmueble (Casa, Edificio, etc.)
  id: string | null = ''; // ID del alojamiento
  nombre_inmueble: string | null = '';
  renta: string | null = "";
  fechaVisita: string | undefined;
  horaVisita: string | undefined;
  userRole: string | null = null;
  comentarios: any[] = [];

  constructor(
    private route: ActivatedRoute, // Para acceder a los parámetros de la ruta
    private inmuebleService: AlojamientosService, // Para obtener los detalles del alojamiento
    private router: Router, // Para la navegación entre páginas
    private http: HttpClient, // Inyectamos HttpClient para hacer la solicitud POST
    private loginService: LoginserviceService,
  ) {}

  

  ngOnInit(): void {
    // Obtener el ID del alojamiento y el tipo de inmueble desde la URL
    this.id = this.route.snapshot.paramMap.get('id');
    this.tipoInmueble = this.route.snapshot.paramMap.get('tipo_inmueble');
    this.userRole = this.loginService.getUserRole();
    if (this.id) {
      this.obtenerComentarios(parseInt(this.id, 10));
    }
    
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

  obtenerComentarios(idInmueble: number) {
    this.inmuebleService.obtenerComentarios(idInmueble).subscribe({
      next: (data) => {
        console.log("Comentarios recibidos: ", data); // Imprime los datos correctamente
        console.log("Comentarios (JSON):", JSON.stringify(data, null, 2)); // Opción para verlo como JSON
        this.comentarios = data;
      },
      
      error: (err) => console.error('Error al obtener comentarios:', err),
    });
  }

  agendarVisita() {
    if (this.fechaVisita && this.horaVisita) {
      const citaVisita = {
        idinmuebles: this.id!,
        fecha: this.fechaVisita,
        hora: this.horaVisita,
        realizada: false,
      };

      this.inmuebleService.agendarVisita(citaVisita).subscribe({
        next: (response) => {
          console.log('Visita agendada:', response);
          alert(`Visita agendada para el ${this.fechaVisita} a las ${this.horaVisita}`);
        },
        error: (err) => {
          console.error('Error al agendar visita:', err);
          alert('Hubo un problema al agendar la visita. Intenta de nuevo.');
        },
      });
    } else {
      alert('Por favor, selecciona una fecha y una hora.');
    }
  }

  volver(): void {
    // Redirigir a la lista de alojamientos
    this.router.navigate(['/alojamientos']);
  }
}

