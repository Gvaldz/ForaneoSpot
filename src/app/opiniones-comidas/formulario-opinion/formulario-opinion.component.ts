import { Component, Input, OnInit } from '@angular/core';
import { VendedorService } from '../../vendedor.service'; // El servicio que maneja la API
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-opinion',
  templateUrl: './formulario-opinion.component.html',
  styleUrls: ['./formulario-opinion.component.css']
})
export class FormularioOpinionComponent implements OnInit {
  @Input() idusuariovendedor: number = 0;

  isModalOpen: boolean = false;
  calificacion: number | null = null;
  descripcion: string = '';

  constructor(
    private vendedorService: VendedorService,
    private router: Router
  ) {}

  ngOnInit() {}

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  submitOpinion(): void {
    if (
      this.idusuariovendedor > 0 &&
      this.calificacion !== null &&
      this.calificacion >= 1 &&
      this.calificacion <= 5 &&
      this.descripcion.trim().length > 0
    ) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres enviar esta opinión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, enviar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          const opinionData = {
            idusuariovendedor: this.idusuariovendedor,
            calificacion: this.calificacion,
            descripcion: this.descripcion
          };

          this.vendedorService.submitOpinion(opinionData).subscribe(
            (response) => {
              Swal.fire(
                '¡Éxito!',
                'Tu opinión ha sido enviada correctamente.',
                'success'
              );
              this.closeModal();
            },
            (error) => {
              Swal.fire(
                'Error',
                'Hubo un error al enviar tu opinión.',
                'error'
              );
            }
          );
        }
      });
    } else {
      Swal.fire('Campos incompletos', 'Por favor, ingrese una calificación válida (1-5) y una descripción', 'error');

    }
  }
}
