import { Component, Input, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AlojamientosService } from '../inmueble.service';
import { LoginserviceService } from '../../login/loginservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-alojamiento',
  templateUrl: './card-alojamiento.component.html',
  styleUrl: './card-alojamiento.component.css'
})
export class CardAlojamientoComponent implements OnInit{

  constructor(private router: Router, private inmuebleService: AlojamientosService, private loginService: LoginserviceService) {}

  @Input() alojamiento: any;
  @Input() userRole: string | null = null;

  ngOnInit(): void {
    this.userRole = this.loginService.getUserRole();
  }

  onEdit() {
    const tipo = this.alojamiento.tipo_inmueble;
    const id = this.alojamiento.idinmuebles;
    this.router.navigate([`${tipo.toLowerCase()}/editar`, id]);
  }
  
  onDelete() {
    const tipo = this.alojamiento.tipo_inmueble;
    const id = this.alojamiento.idinmuebles;
  
    if (confirm('¿Estás seguro de eliminar este inmueble?')) {
      this.inmuebleService.deleteInmueblePorTipo(tipo, id).subscribe(
        () => {
          Swal.fire('Eliminado!', 'El inmueble ha sido eliminado.', 'success');
          this.router.navigate(['/alojamientos']); 
        },
        (error: any) => {
          console.error('Error al eliminar el inmueble:', error);
          Swal.fire('Error', 'Hubo un problema al eliminar el inmueble.', 'error');
        }
      );
    }
  }
  
}
