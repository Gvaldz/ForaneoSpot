import { Component, OnInit } from '@angular/core';
import { VendedorService } from '../../vendedor.service';

@Component({
  selector: 'app-vendedores-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css'],
})
export class FavoritosComponent implements OnInit {
  vendedoresFavoritos: any[] = [];

  constructor(private vendedorService: VendedorService) {}

  ngOnInit(): void {
    this.cargarVendedoresFavoritos();
  }

  cargarVendedoresFavoritos(): void {
    this.vendedorService.obtenerVendedores().subscribe({
      next: (vendedores) => {
        this.vendedorService.obtenerVendedoresFavoritos().subscribe({
          next: (favoritos) => {
            const favoritosIds = favoritos.map((favorito) => ({
              vendedorId: favorito.id_usuario_vendedor,
              favoritoId: favorito.id,
            }));

            this.vendedoresFavoritos = vendedores.filter((vendedor) => {
              const favorito = favoritosIds.find(
                (fav) => fav.vendedorId === vendedor.id
              );
              if (favorito) {
                vendedor.favoritoId = favorito.favoritoId; // Agregar el ID de favorito a cada vendedor
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
}
