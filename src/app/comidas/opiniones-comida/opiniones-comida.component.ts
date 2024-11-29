import { Component, Input } from '@angular/core';
import { VendedorService } from '../../vendedor.service';
import { ActivatedRoute } from '@angular/router';
import {ComidaService} from '../comida.service';
import {LoginserviceService} from '../../login/loginservice.service';

@Component({
  selector: 'app-opiniones-comida',
  templateUrl: './opiniones-comida.component.html',
  styleUrls: ['./opiniones-comida.component.css'],
})
export class OpinionesComidaComponent {
  @Input() vendedorId!: number;
  @Input() usuarioId!: number; // ID del usuario actual
  opiniones: any[] = [];
  calificacionPromedio: number = 0;
  isLoading: boolean = true;

  constructor(private comidaService: ComidaService,private vendedorService: VendedorService, private route: ActivatedRoute, private loginserviceService: LoginserviceService) {}

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
          this.calificarVendedor(); // Recalcula la calificación promedio
        },
        (error) => {
          console.error('Error al eliminar la opinión:', error);
        }
      );
    }
  }
}
