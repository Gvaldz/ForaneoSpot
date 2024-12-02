import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.min.css';
import { VendedorService } from '../../vendedor.service';
import {Router} from '@angular/router';

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
      },
      error: (error) => {
        console.error('Error al añadir vendedor a favoritos:', error);
        alert('No se pudo añadir el vendedor a favoritos. Intenta de nuevo.');
      },
    });
  }

  volver(): void {
    window.history.back();
  }


  esFavorito: boolean = false;

  toggleFavorito() {
    this.esFavorito = !this.esFavorito;
    this.marcarFavorito()
  }

  editOpinion(opinionId: number) {
    this.router.navigate(['/current-route'], {
      queryParams: { editOpinionId: opinionId }
    });
  }
}
