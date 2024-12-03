import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlojamientosService } from '../inmuebles/inmueble.service';
import { HttpClient } from '@angular/common/http';
import { LoginserviceService } from '../login/loginservice.service';
import { CaracteristicasService } from '../inmuebles/caracteristicas.service';

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
  nuevoComentario: any
  calificacion: number | null = null;
  descripcionComentario: string = '';
  modal: boolean = false;
  idusuarioarrendador: number | null = null;
  servicios: any[] = []; // Servicios asociados al inmueble
  
  constructor(
    private route: ActivatedRoute, // Para acceder a los parámetros de la ruta
    private inmuebleService: AlojamientosService, // Para obtener los detalles del alojamiento
    private router: Router, // Para la navegación entre páginas
    private http: HttpClient, // Inyectamos HttpClient para hacer la solicitud POST
    private loginService: LoginserviceService,
    private caracteristicasService: CaracteristicasService
  ) {}

  abrirModalComentario() {
    this.modal = true; 
    const modal = document.getElementById('modalComentario');
    if (modal) {
      modal.style.display = 'block'; 
    }
  }
  
  cerrarModalComentario() {
    this.modal = false; 
    const modal = document.getElementById('modalComentario');
    if (modal) {
      modal.style.display = 'none'; 
    }
  }
  
  
  enviarComentario() {
    if (!this.calificacion || this.calificacion < 1 || this.calificacion > 5) {
      console.log(this.calificacion)
      alert('Por favor, proporciona una calificación válida entre 1 y 5.');
      return;
    }
  
    if (!this.descripcionComentario.trim()) {
      alert('El comentario no puede estar vacío.');
      return;
    }
  
    const nuevoComentario = {
      idinmueble: this.id!, // Usar `!` porque ya verificamos antes que no es null
      calificacion: this.calificacion,
      descripcion: this.descripcionComentario,
    };
  
    this.inmuebleService.agregarComentario(nuevoComentario).subscribe({
      next: (response) => {
        console.log('Comentario publicado:', response);
        this.obtenerComentarios(parseInt(this.id!, 10));
        this.cerrarModalComentario();
  
        // Limpiar el formulario después de enviar
        this.calificacion = null;
        this.descripcionComentario = '';
      },
      error: (err) => {
        console.error('Error al publicar comentario:', err);
        alert('Hubo un error al publicar el comentario. Intenta de nuevo.');
      },
    });
  }
  
  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.tipoInmueble = this.route.snapshot.paramMap.get('tipo_inmueble');
    this.userRole = this.loginService.getUserRole();
  
    if (this.id) {
      this.obtenerComentarios(parseInt(this.id, 10));
    }
  
    if (this.id && this.tipoInmueble) {
      this.obtenerServicios(parseInt(this.id, 10));
      this.inmuebleService.getInmueblePorId(this.tipoInmueble, parseInt(this.id, 10)).subscribe({
        next: (data) => {
          this.alojamiento = data;
          this.idusuarioarrendador = this.alojamiento.idusuarioarrendador;
  
          if (this.idusuarioarrendador) {
            this.inmuebleService.obtenerArrendador(this.idusuarioarrendador).subscribe({
              next: (arrendadorData) => {
                this.alojamiento.arrendador = arrendadorData; 
              },
              error: (err) => {
                console.error('Error al obtener datos del arrendador:', err);
              }
            });
          }
        },
        error: (err) => {
          console.error('Error al obtener detalles del alojamiento:', err);
        },
      });
    } else {
      console.error('No se encontraron los parámetros necesarios (id o tipo).');
      this.router.navigate(['/alojamientos']);
    }
  }  

  obtenerServicios(idInmueble: number): void {
    this.caracteristicasService.getServiciosInmueble(idInmueble).subscribe({
      next: (serviciosInmueble) => {
        this.caracteristicasService.getServicios().subscribe({
          next: (todosLosServicios) => {
            this.servicios = serviciosInmueble.map((servicioInmueble) => {
              const servicio = todosLosServicios.find(
                (s) => s.idservicios === servicioInmueble.idservicio
              );
              return {
                ...servicioInmueble,
                descripcion: servicio ? servicio.descripcion : 'Descripción no disponible',
              };
            });
          },
          error: (err) => {
            console.error('Error al obtener la lista general de servicios:', err);
          },
        });
      },
      error: (err) => {
        console.error('Error al obtener servicios del inmueble:', err);
      },
    });
  }
    

  obtenerComentarios(idInmueble: number) {
    this.inmuebleService.obtenerComentarios(idInmueble).subscribe({
      next: (data) => {
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
