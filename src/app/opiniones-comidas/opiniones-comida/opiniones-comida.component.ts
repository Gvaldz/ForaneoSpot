import {Component, Input, OnInit} from '@angular/core';
import { VendedorService } from '../../vendedor.service';
import { ActivatedRoute } from '@angular/router';
import {ComidaService} from '../../comidas/comida.service';
import {LoginserviceService} from '../../login/loginservice.service';

@Component({
  selector: 'app-opiniones-comida',
  templateUrl: './opiniones-comida.component.html',
  styleUrls: ['./opiniones-comida.component.css'],
})
export class OpinionesComidaComponent implements OnInit{

  @Input() vendedorId!: number;
  @Input() usuarioId!: number;
  opiniones: any[] = [];
  calificacionPromedio: number = 0;
  isLoading: boolean = true;

  // Nueva propiedad para manejar la opinión en edición
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
    if (confirm('¿Estás seguro de que deseas eliminar esta opinión?')) {
      this.comidaService.deleteOpinion(idopinion).subscribe(
        () => {
          this.opiniones = this.opiniones.filter((opinion) => opinion.idopinion !== idopinion);
          this.calificarVendedor();
        },
        (error) => {
          console.error('Error al eliminar la opinión:', error);
        }
      );
    }
  }

  // Nuevo método para iniciar la edición
  startEditing(opinion: any): void {
    this.editingOpinion = { ...opinion };
  }

  // Método para cancelar la edición
  cancelEditing(): void {
    this.editingOpinion = null;
  }

  // Método para guardar la edición
  saveEditedOpinion(): void {
    if (this.editingOpinion) {
      // Validar los datos antes de enviar
      if (
        this.editingOpinion.calificacion !== null &&
        this.editingOpinion.calificacion >= 1 &&
        this.editingOpinion.calificacion <= 10 &&
        this.editingOpinion.descripcion.trim().length > 0
      ) {
        const updateData = {
          idusuariovendedor: this.editingOpinion.idusuariovendedor, // Asegúrate de que este campo exista en la opinión
          calificacion: this.editingOpinion.calificacion,
          descripcion: this.editingOpinion.descripcion
        };

        this.vendedorService.updateOpinion(this.editingOpinion.idopinion, updateData).subscribe(
          (updatedOpinion) => {
            // Actualizar la opinión en la lista
            const index = this.opiniones.findIndex(o => o.idopinion === this.editingOpinion.idopinion);
            if (index !== -1) {
              this.opiniones[index] = updatedOpinion;
            }

            // Recalcular calificación promedio
            this.calificarVendedor();

            // Limpiar el estado de edición
            this.editingOpinion = null;
          },
          (error) => {
            console.error('Error al actualizar la opinión:', error);
            alert('No se pudo actualizar la opinión');
          }
        );
      } else {
        alert('Por favor, ingrese una calificación válida (1-10) y una descripción');
      }
    }
  }
}
