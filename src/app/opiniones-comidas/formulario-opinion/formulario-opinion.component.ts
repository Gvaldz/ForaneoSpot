import { Component, Input, OnInit } from '@angular/core';
import {VendedorService} from '../../vendedor.service'; // El servicio que maneja la API
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-opinion',
  templateUrl: './formulario-opinion.component.html',
  styleUrls: ['./formulario-opinion.component.css']
})
export class FormularioOpinionComponent implements OnInit{
  @Input() idusuariovendedor: number = 0;

  isModalOpen: boolean = false;
  calificacion: number | null = null;
  descripcion: string = '';

  constructor(
    private vendedorService: VendedorService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('Vendor ID received:', this.idusuariovendedor);
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  submitOpinion(): void {
    // Enhanced logging for debugging
    console.log('Submitting Opinion - Validation Check:');
    console.log('Vendor ID:', this.idusuariovendedor);
    console.log('Calificacion:', this.calificacion);
    console.log('Descripcion:', this.descripcion);

    // Adjusted validation
    if (
      this.idusuariovendedor > 0 &&
      this.calificacion !== null &&
      this.calificacion >= 1 &&
      this.calificacion <= 10 &&
      this.descripcion.trim().length > 0
    ) {
      const opinionData = {
        idusuariovendedor: this.idusuariovendedor,
        calificacion: this.calificacion,
        descripcion: this.descripcion
      };

      this.vendedorService.submitOpinion(opinionData).subscribe(
        (response) => {
          console.log('Opinión enviada correctamente', response);
          this.closeModal();
          this.router.navigate(['/vendedor', this.idusuariovendedor])
            .then(() => {
              window.location.reload();
            });
        },
        (error) => {
          console.error('Error al enviar la opinión:', error);
          alert('Hubo un error al enviar tu opinión');
        }
      );
    } else {
      console.error('Validation Failed - Details:',{
        vendorIdValid: this.idusuariovendedor > 0,
        calificacionValid: this.calificacion !== null && this.calificacion >= 1 && this.calificacion <= 5,
        descripcionValid: this.descripcion.trim().length > 0
      });
      alert('Por favor, completa todos los campos correctamente');
    }
  }
}
