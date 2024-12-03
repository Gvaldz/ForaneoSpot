import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { VendedorService } from '../../vendedor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-vendedor',
  templateUrl: './detalle-vendedor.component.html',
  styleUrls: ['./detalle-vendedor.component.css'],
})
export class DetalleVendedorComponent implements OnInit {
  menus: any[] = [];
  vendedor: any;
  cargando: boolean = true;
  error: string | null = null;
  esFavorito: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private vendedorService: VendedorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
  
    if (id) {
      this.vendedorService.obtenerDetallesVendedor(id).subscribe({
        next: (data) => {
          this.vendedor = data;
          this.cargando = false;
          this.obtenerEstadoFavorito(id);
        },
        error: (err) => {
          console.error('Error al obtener los detalles del vendedor:', err);
          this.error = 'No se pudieron cargar los detalles del vendedor.';
          this.cargando = false;
        },
      });
      this.vendedorService.obtenerMenusVendedor(id).subscribe({
        next: (data) => {
          this.menus = data;
        },
        error: (err) => {
          console.error('Error al obtener los menús del vendedor:', err);
          this.error = 'No se pudieron cargar los menús del vendedor.';
        },
      });
    } else {
      this.error = 'ID de vendedor no válido.';
      this.cargando = false;
    }
  }

  obtenerEstadoFavorito(id: number): void {
    this.vendedorService.obtenerVendedoresFavoritos().subscribe({
      next: (favoritos) => {
        this.esFavorito = favoritos.some(fav => fav.id_usuario_vendedor === id);
      },
      error: (err) => {
        console.error('Error al obtener los favoritos:', err);
      }
    });
  }

  toggleFavorito(): void {
    this.marcarFavorito();
  }

  marcarFavorito(): void {
    this.vendedorService.agregarVendedorFavorito(this.vendedor.id).subscribe({
      next: () => {
        this.esFavorito = true;
        Swal.fire('¡Vendedor añadido a favoritos!', '', 'success');
      },
      error: () => {
        Swal.fire('Error', 'No se pudo agregar a favoritos', 'error');
      }
    });
  }

}
