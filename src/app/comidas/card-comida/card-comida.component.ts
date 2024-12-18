import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ComidaService } from '../comida.service';
import Swal from 'sweetalert2';
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
  menuVisible: boolean = false;

  constructor(private router: Router, private comidaService: ComidaService) {}

  navegarMenuComida() {
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
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        this.comidaService.deleteComida(menuId).subscribe(
          () => {
            Swal.fire('Eliminado', 'El menú ha sido eliminado correctamente.', 'success');
            this.router.navigate(['/comida']);
          },
          (error) => {
            console.error('Error al eliminar el menú:', error);
            Swal.fire('Error', 'No se pudo eliminar el menú.', 'error');
          }
        );
      }
    });
  }
  
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
  
  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  verDetallesVendedor(id_usuario_vendedor: number) {
    this.router.navigate([`/vendedor/${id_usuario_vendedor}`]);
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