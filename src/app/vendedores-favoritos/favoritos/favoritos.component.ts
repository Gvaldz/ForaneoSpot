import { Component, OnInit } from '@angular/core';
import { VendedorService } from '../../vendedor.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendedores-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css'],
})
export class FavoritosComponent implements OnInit {
  vendedoresFavoritos: any[] = [];

  constructor(private vendedorService: VendedorService, private router: Router) {}

  ngOnInit(): void {
    this.cargarVendedoresFavoritos();
  }

  cargarVendedoresFavoritos(): void {
    this.vendedorService.obtenerVendedores().subscribe({
      next: (vendedores) => {
        this.vendedorService.obtenerVendedoresFavoritos().subscribe({
          next: (favoritos) => {
            console.log(favoritos)
            const favoritosIds = favoritos.map((favorito) => ({
              vendedorId: favorito.id_usuario_vendedor,
              favoritoId: favorito.id
            }));

            this.vendedoresFavoritos = vendedores.filter((vendedor) => {
              const favorito = favoritosIds.find(
                (fav) => fav.vendedorId === vendedor.id
              );
              if (favorito) {
                vendedor.favoritoId = favorito.favoritoId;
              }
              return !!favorito;
            });
          },
          error: (error) => {
            console.error('Error al obtener los IDs de favoritos:', error);
          },
        });
      },
      error: (error) => {
        console.error('Error al obtener la lista de vendedores:', error);
      },
    });
  }

  confirmarEliminarFavorito(vendedor: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar a ${vendedor.nombre} de tus favoritos?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarDeFavoritos(vendedor.favoritoId);
        Swal.fire(
          'Eliminado',
          `${vendedor.nombre} ha sido eliminado de tus favoritos.`,
          'success'
        );
      }
    });
  }
  
  eliminarDeFavoritos(favoritoId: number): void {
    this.vendedorService.eliminarVendedorFavorito(favoritoId).subscribe({
      next: () => {
        console.log('Vendedor eliminado de favoritos');
        this.vendedoresFavoritos = this.vendedoresFavoritos.filter(
          (vendedor) => vendedor.favoritoId !== favoritoId
        );
      },
      error: (error) => {
        console.error('Error al eliminar vendedor favorito:', error);
      },
    });
  }

  irAVendedor(vendedor: any): void {
    this.router.navigate([`/vendedor/${vendedor.id}`]);
  }
}
