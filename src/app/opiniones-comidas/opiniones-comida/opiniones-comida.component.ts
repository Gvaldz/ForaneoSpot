import { Component, Input, OnInit } from '@angular/core';
import { VendedorService } from '../../vendedor.service';
import { ActivatedRoute } from '@angular/router';
import { ComidaService } from '../../comidas/comida.service';
import { LoginserviceService } from '../../login/loginservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-opiniones-comida',
  templateUrl: './opiniones-comida.component.html',
  styleUrls: ['./opiniones-comida.component.css'],
})
export class OpinionesComidaComponent implements OnInit {
  @Input() vendedorId!: number;
  @Input() usuarioId!: number;
  opiniones: any[] = [];
  calificacionPromedio: number = 0;
  isLoading: boolean = true;

  editingOpinion: any = null;

  constructor(
    private comidaService: ComidaService,
    private vendedorService: VendedorService,
    private route: ActivatedRoute,
    private loginserviceService: LoginserviceService
  ) {}

  ngOnInit(): void {
    console.log('Vendedor ID:', this.vendedorId);
    // @ts-ignore
    this.usuarioId = this.loginserviceService.getUserId();
    if (isNaN(this.vendedorId) || this.vendedorId <= 0) {
      console.error('Vendedor ID no válido:', this.vendedorId);
      return;
    }

    this.obtenerOpiniones(this.vendedorId);
  }

  obtenerOpiniones(vendedorId: number): void {
    this.vendedorService.getOpiniones(vendedorId).subscribe(
      (data) => {
        this.opiniones = data;
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
      this.calificacionPromedio = 0;
    }
  }

  eliminarOpinion(idopinion: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.comidaService.deleteOpinion(idopinion).subscribe(
          () => {
            this.opiniones = this.opiniones.filter((opinion) => opinion.idopinion !== idopinion);
            this.calificarVendedor();
            Swal.fire('Eliminada', 'La opinión ha sido eliminada.', 'success');
          },
          (error) => {
            console.error('Error al eliminar la opinión:', error);
            Swal.fire('Error', 'Hubo un problema al eliminar la opinión.', 'error');
          }
        );
      }
    });
  }

  startEditing(opinion: any): void {
    this.editingOpinion = { ...opinion };
  }

  cancelEditing(): void {
    this.editingOpinion = null;
  }

  saveEditedOpinion(): void {
    if (this.editingOpinion) {
      if (
        this.editingOpinion.calificacion !== null &&
        this.editingOpinion.calificacion >= 1 &&
        this.editingOpinion.calificacion <= 5 &&
        this.editingOpinion.descripcion.trim().length > 0
      ) {
        const updateData = {
          idusuariovendedor: this.editingOpinion.idusuariovendedor,
          calificacion: this.editingOpinion.calificacion,
          descripcion: this.editingOpinion.descripcion,
        };

        this.vendedorService.updateOpinion(this.editingOpinion.idopinion, updateData).subscribe(
          (updatedOpinion) => {
            const index = this.opiniones.findIndex((o) => o.idopinion === this.editingOpinion.idopinion);
            if (index !== -1) {
              this.opiniones[index] = updatedOpinion;
            }
            this.calificarVendedor();

            this.editingOpinion = null;
            Swal.fire('¡Éxito!', 'La opinión ha sido actualizada.', 'success');
          },
          (error) => {
            console.error('Error al actualizar la opinión:', error);
            Swal.fire('Error', 'No se pudo actualizar la opinión', 'error');
          }
        );
      } else {
        Swal.fire('Campos incompletos', 'Por favor, ingrese una calificación válida (1-5) y una descripción', 'error');
      }
    }
  }
}
