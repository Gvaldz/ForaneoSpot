import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ComidaService } from '../comida.service';
import Swal from 'sweetalert2';
import { Comida } from '../comida';

@Component({
  selector: 'app-card-comida',
  templateUrl: './card-comida.component.html',
  styleUrls: ['./card-comida.component.css']
})
export class CardComidaComponent {
  @Input() comida: any; 
  @Input() userRole: string | null = null;
  especificaciones: string = '';
  showModal: boolean = false;

  constructor(private router: Router, private comidaService: ComidaService) {}

  navegarMenuComida() {
    console.log(`Ordenar comida: ${this.comida.nombre}`);
    Swal.fire({
      title: "Especificaciones",
      input: "text",
      inputPlaceholder: `Especificaciones para ${this.comida.nombre}`,
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "ACEPTAR",
      confirmButtonColor: "blue",
      cancelButtonText: "CANCELAR",
      cancelButtonColor: "red",
      showLoaderOnConfirm: true,
    });
  }

  onEdit(menu: any) {
    this.router.navigate(['comida/editar', menu.id]);
  }
  
  onDelete(menuId: number) {
    if (confirm('¿Estás seguro de eliminar este menú?')) {
      this.comidaService.deleteComida(menuId).subscribe(
        () => {
          Swal.fire('Eliminado!', 'El menú ha sido eliminado.', 'success');
          this.router.navigate(['/comida']); 
        },
        (error) => {
          console.error('Error al eliminar el menú:', error);
          Swal.fire('Error', 'Hubo un problema al eliminar el menú.', 'error');
        }
      );
    }
  }
  
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  ordenarComida() {
    if (this.comida) {
      this.comidaService.createPedido(this.comida, this.especificaciones).subscribe({
        next: (pedido) => {
          console.log('Pedido creado con éxito:', pedido);
          this.showModal = false; 
        },
        error: (err) => {
          console.error('Error al crear el pedido:', err);
        },
      });
    }
  }
  
  showButtonsForVendedor() {
    return this.userRole === 'vendedor';
  }
}