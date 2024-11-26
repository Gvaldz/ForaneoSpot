import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VendedorService } from '../../vendedor.service';

@Component({
  selector: 'app-detalle-vendedor',
  templateUrl: './detalle-vendedor.component.html',
  styleUrls: ['./detalle-vendedor.component.css'],
})
export class DetalleVendedorComponent implements OnInit {
  vendedor: any;
  cargando: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private vendedorService: VendedorService
  ) {}

  ngOnInit(): void {
    // Obtener el ID del vendedor desde la URL
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
    } else {
      this.error = 'ID de vendedor no válido.';
      this.cargando = false;
    }
  }

  volver(): void {
    window.history.back();
  }
}
