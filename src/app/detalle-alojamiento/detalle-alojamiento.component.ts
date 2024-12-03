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
  nuevoComentario: any
  calificacion: number | null = null;
  descripcionComentario: string = '';
  modal: boolean = false;
  idusuarioarrendador: number | null = null;
  modalEditar: boolean = false;
comentarioEditado: any = null;
public userId: number | null = null;
  
  constructor(
    private route: ActivatedRoute, // Para acceder a los parámetros de la ruta
    private inmuebleService: AlojamientosService, // Para obtener los detalles del alojamiento
    private router: Router, // Para la navegación entre páginas
    private http: HttpClient, // Inyectamos HttpClient para hacer la solicitud POST
    private loginService: LoginserviceService,
  ) {}

  abrirModalComentario() {
    this.modal = true; 
    const modal = document.getElementById('modalComentario');
    if (modal) {
      modal.style.display = 'block'; 
    }
  }
  getUserId(): number {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    return usuario?.id || 0;
  }
  cerrarModalComentario() {
    this.modal = false; 
    const modal = document.getElementById('modalComentario');
    if (modal) {
      modal.style.display = 'none'; 
    }
  }

  abrirModalEditar(comentario: any) {
    this.comentarioEditado = { ...comentario }; // Crear una copia para editar
    this.modalEditar = true;
  }
  
  cerrarModalEditar() {
    this.modalEditar = false;
    this.comentarioEditado = null;
  }
  
  guardarEdicion() {
    if (!this.comentarioEditado || !this.comentarioEditado.id) {
      alert('Error: No se pudo identificar el comentario para editar.');
      return;
    }
  
    this.inmuebleService.editarComentario(this.comentarioEditado.id, {
      calificacion: this.comentarioEditado.calificacion,
      descripcion: this.comentarioEditado.descripcion,
    }).subscribe({
      next: (response) => {
        console.log('Comentario actualizado:', response);
        this.obtenerComentarios(parseInt(this.id!, 10));
        this.cerrarModalEditar();
      },
      error: (err) => {
        console.error('Error al editar el comentario:', err);
        alert('Hubo un error al editar el comentario. Intenta de nuevo.');
      },
    });
  }
  
  eliminarComentario(idComentario: number) {
    console.log("Eliminando comentario con ID:", idComentario);  // Verifica el id
    if (confirm('¿Estás seguro de que deseas eliminar este comentario?')) {
      this.inmuebleService.eliminarComentario(idComentario).subscribe({
        next: (response) => {
          console.log('Comentario eliminado:', response);
          this.obtenerComentarios(parseInt(this.id!, 10)); // Asegúrate de que `id` está bien definido
        },
        error: (err) => {
          console.error('Error al eliminar el comentario:', err);
          alert('Hubo un error al eliminar el comentario. Intenta de nuevo.');
        },
      });
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
    this.userId = this.loginService.getUserId();
  
    if (this.id) {
      this.obtenerComentarios(parseInt(this.id, 10));
    }
  
    if (this.id && this.tipoInmueble) {
      this.inmuebleService.getInmueblePorId(this.tipoInmueble, parseInt(this.id, 10)).subscribe({
        next: (data) => {
          this.alojamiento = data;
          this.idusuarioarrendador = this.alojamiento.idusuarioarrendador;
  
          if (this.idusuarioarrendador) {
            this.inmuebleService.obtenerArrendador(this.idusuarioarrendador).subscribe({
              next: (arrendadorData) => {
                this.alojamiento.arrendador = arrendadorData; 
                console.log(arrendadorData)
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
