import { Component, Input } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.min.css';
import { VendedorService } from '../../vendedor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-vendedor',
  templateUrl: './card-vendedor.component.html',
  styleUrl: './card-vendedor.component.css',
})
export class CardVendedorComponent {
  @Input() vendedor: any;

  constructor(private vendedorService: VendedorService, private router: Router) {}

  marcarFavorito(): void {
    this.alerta();

    this.agregarFavorito(this.vendedor.id);
  }

  alerta() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Vendedor Guardado Como Favorito :)',
      showConfirmButton: false,
      timer: 1700,
    });
  }

  agregarFavorito(id: number): void {
    this.vendedorService.agregarVendedorFavorito(id).subscribe({
      next: (response) => {
        console.log('Vendedor añadido a favoritos:', response);
        alert('Vendedor añadido a favoritos exitosamente');
      },
      error: (error) => {
        console.error('Error al añadir vendedor a favoritos:', error);
        alert('No se pudo añadir el vendedor a favoritos. Intenta de nuevo.');
      },
    });
  }

  irAVendedor(): void {
    this.router.navigate([`/vendedor/${this.vendedor.id}`]);
  }
}
