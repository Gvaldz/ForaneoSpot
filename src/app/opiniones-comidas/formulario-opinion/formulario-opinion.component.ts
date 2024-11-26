import { Component } from '@angular/core';
import {VendedorService} from '../../vendedor.service'; // El servicio que maneja la API
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-opinion',
  templateUrl: './formulario-opinion.component.html',
  styleUrls: ['./formulario-opinion.component.css']
})
export class FormularioOpinionComponent {
  isModalOpen: boolean = false; // Controla si el modal está abierto o cerrado
  idusuariovendedor: number = 0;
  calificacion: number = 0;
  descripcion: string = '';

  constructor(
    private vendedorService: VendedorService,
    private router: Router
  ) {}

  openModal(): void {
    this.isModalOpen = true;
  }

  // Método para cerrar el modal
  closeModal(): void {
    this.isModalOpen = false;
  }

  // Método para enviar la opinión
  submitOpinion(): void {
    if (this.idusuariovendedor > 0 && this.calificacion >= 1 && this.calificacion <= 5 && this.descripcion.trim()) {
      const opinionData = {
        idusuariovendedor: this.idusuariovendedor,
        calificacion: this.calificacion,
        descripcion: this.descripcion
      };

      this.vendedorService.submitOpinion(opinionData).subscribe(
        (response) => {
          console.log('Opinión enviada correctamente', response);
          this.closeModal(); // Cierra el modal después de enviar
          this.router.navigate(['/opiniones-comidas']); // O redirige a donde quieras
        },
        (error) => {
          console.error('Error al enviar la opinión:', error);
          alert('Hubo un error al enviar tu opinión');
        }
      );
    } else {
      console.log('Por favor, completa todos los campos correctamente');
      alert('Por favor, completa todos los campos correctamente');
    }
  }
}
