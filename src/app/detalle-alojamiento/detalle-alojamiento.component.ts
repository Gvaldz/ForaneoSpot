import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlojamientosService } from '../inmuebles/inmueble.service';
import { HttpClient } from '@angular/common/http';
import { LoginserviceService } from '../login/loginservice.service';
import { CaracteristicasService } from '../inmuebles/caracteristicas.service';
import Swal from 'sweetalert2';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-detalle-alojamiento',
  templateUrl: './detalle-alojamiento.component.html',
  styleUrls: ['./detalle-alojamiento.component.css']
})
export class DetalleAlojamientoComponent implements OnInit {
  alojamiento: any = null;
  tipoInmueble: string | null = '';
  id: string | null = '';
  nombre_inmueble: string | null = '';
  renta: string | null = '';
  fechaVisita: string | undefined;
  horaVisita: string | undefined;
  userRole: string | null = null;
  comentarios: any[] = [];
  nuevoComentario: any;
  calificacion: number | null = null;
  descripcionComentario: string = '';
  modal: boolean = false;
  idusuarioarrendador: number | null = null;
  servicios: any[] = [];
  modalEditar: boolean = false;
  comentarioEditado: any = null;
  public userId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private inmuebleService: AlojamientosService,
    private router: Router,
    private http: HttpClient,
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

  abrirModalEditar(comentario: any) {
    this.comentarioEditado = { ...comentario };
    this.modalEditar = true;
  }

  cerrarModalEditar() {
    this.modalEditar = false;
    this.comentarioEditado = null;
  }

  guardarEdicion(comentarioEditado: any) {
    if (comentarioEditado.calificacion < 0 || comentarioEditado.calificacion > 5) {
      Swal.fire('Error', 'La calificación debe ser un valor entre 0 y 5.', 'error');
      return;
    }
      if (!this.comentarioEditado || !this.comentarioEditado.idopiniones) {
      Swal.fire('Error', 'No se pudo identificar el comentario para editar.', 'error');
      return;
    }
      this.inmuebleService.editarComentario(this.comentarioEditado.idopiniones, {
      calificacion: this.comentarioEditado.calificacion,
      descripcion: this.comentarioEditado.descripcion,
    }).subscribe({
      next: (response) => {
        Swal.fire('Éxito', 'Comentario actualizado con éxito.', 'success');
        this.obtenerComentarios(parseInt(this.id!, 10));
        this.cerrarModalEditar();
      },
      error: (err) => {
        console.error('Error al editar el comentario:', err);
        Swal.fire('Error', 'Hubo un problema al editar el comentario. Intenta de nuevo.', 'error');
      },
    });
  }

  eliminarComentario(idComentario: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto eliminará el comentario de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.inmuebleService.eliminarComentario(idComentario).subscribe({
          next: (response) => {
            Swal.fire('Eliminado', 'El comentario se eliminó con éxito.', 'success');
            this.obtenerComentarios(parseInt(this.id!, 10));
          },
          error: (err) => {
            console.error('Error al eliminar el comentario:', err);
            Swal.fire('Error', 'Hubo un problema al eliminar el comentario. Intenta de nuevo.', 'error');
          },
        });
      }
    });
  }

  validarFechaYHora(): boolean {
    if (!this.fechaVisita || !this.horaVisita) {
      Swal.fire('Advertencia', 'Por favor, selecciona una fecha y una hora.', 'warning');
      return false;
    }
    const fechaSeleccionada = new Date(this.fechaVisita);
    const fechaHoy = new Date();
    const horaSeleccionada = parseInt(this.horaVisita.split(":")[0], 10);
      fechaHoy.setHours(0, 0, 0, 0);
    fechaSeleccionada.setHours(0, 0, 0, 0);
      if (fechaSeleccionada <= fechaHoy) {
      Swal.fire('Advertencia', 'La fecha seleccionada debe ser posterior a hoy.', 'warning');
      return false;
    }
      if (horaSeleccionada < 8 || horaSeleccionada > 18) {
      Swal.fire('Advertencia', 'La hora seleccionada debe estar entre las 8 AM y las 6 PM.', 'warning');
      return false;
    }
  
    return true;
  }
  

  enviarComentario() {
    if (!this.calificacion || this.calificacion < 1 || this.calificacion > 5) {
      Swal.fire('Advertencia', 'Por favor, proporciona una calificación válida entre 1 y 5.', 'warning');
      return;
    }

    if (!this.descripcionComentario.trim()) {
      Swal.fire('Advertencia', 'El comentario no puede estar vacío.', 'warning');
      return;
    }

    const nuevoComentario = {
      idinmueble: this.id!,
      calificacion: this.calificacion,
      descripcion: this.descripcionComentario,
    };

    this.inmuebleService.agregarComentario(nuevoComentario).subscribe({
      next: (response) => {
        Swal.fire('Éxito', 'Comentario publicado con éxito.', 'success');
        this.obtenerComentarios(parseInt(this.id!, 10));
        this.cerrarModalComentario();

        this.calificacion = null;
        this.descripcionComentario = '';
      },
      error: (err) => {
        console.error('Error al publicar comentario:', err);
        Swal.fire('Error', 'Hubo un problema al publicar el comentario. Intenta de nuevo.', 'error');
      },
    });
  }

  agendarVisita() {
    if (this.validarFechaYHora()) {
      const fechaVisitaValidada = this.fechaVisita || '';  
      const horaVisitaValidada = this.horaVisita || '';    
  
      const citaVisita = {
        idinmuebles: this.id!,
        fecha: fechaVisitaValidada,
        hora: horaVisitaValidada,
        realizada: false,
      };
  
      this.inmuebleService.agendarVisita(citaVisita).subscribe({
        next: (response) => {
          Swal.fire('Éxito', `Visita agendada para el ${this.fechaVisita} a las ${this.horaVisita}.`, 'success');
        },
        error: (err) => {
          console.error('Error al agendar visita:', err);
          Swal.fire('Error', 'Hubo un problema al agendar la visita. Intenta de nuevo.', 'error');
        },
      });
    }
  }
  

  volver(): void {
    this.router.navigate(['/alojamientos']);
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

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.tipoInmueble = this.route.snapshot.paramMap.get('tipo_inmueble');
    this.userRole = this.loginService.getUserRole();
    this.userId = this.loginService.getUserId();

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
              },
            });
          }
        },
        error: (err) => {
          console.error('Error al obtener detalles del alojamiento:', err);
        },
      });
    } else {
      Swal.fire('Error', 'No se encontraron los parámetros necesarios (id o tipo).', 'error');
      this.router.navigate(['/alojamientos']);
    }
  }
}
