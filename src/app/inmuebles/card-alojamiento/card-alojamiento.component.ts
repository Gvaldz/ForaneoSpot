import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlojamientosService } from '../inmueble.service';
import { LoginserviceService } from '../../login/loginservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-alojamiento',
  templateUrl: './card-alojamiento.component.html',
  styleUrl: './card-alojamiento.component.css'
})
export class CardAlojamientoComponent implements OnInit {
  @Input() alojamiento: any;
  @Input() userRole: string | null = null;
  @Output() inmuebleEliminado = new EventEmitter<void>();

  constructor(private router: Router, private inmuebleService: AlojamientosService, private loginService: LoginserviceService) {}

  ngOnInit(): void {
    this.userRole = this.loginService.getUserRole();
  }

  onEdit(alojamiento: any) {
    const id = alojamiento.idinmuebles;
    const tipo_inmueble = this.alojamiento.tipo_inmueble;
    this.router.navigate(["inmueble/editar/", tipo_inmueble, id]); 
  }

  onView(alojamiento: any) {
    console.log('Método onView llamado', alojamiento);
  
    const id = this.alojamiento?.idinmuebles;
    const tipo_inmueble = this.alojamiento?.tipo_inmueble;
  
    if (id && tipo_inmueble) {
      console.log('Navegando a:', `inmueble/detalle/${tipo_inmueble}/${id}`);
      this.router.navigate(['inmueble/detalle', tipo_inmueble, id]);
    } else {
      console.error('ID o Tipo de inmueble no definidos:', { id, tipo_inmueble });
    }
  }  

  onDelete() {
    const tipo = this.alojamiento.tipo_inmueble;
    const id = this.alojamiento.idinmuebles;

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminado el inmueble, no podrá recuperarlo.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.inmuebleService.deleteInmueblePorTipo(tipo, id).subscribe(
          () => {
            Swal.fire('Eliminado!', 'El inmueble ha sido eliminado.', 'success');
            this.inmuebleEliminado.emit(); 
          },
          (error: any) => {
            console.error('Error al eliminar el inmueble:', error);
            Swal.fire('Error', 'Hubo un problema al eliminar el inmueble.', 'error');
          }
        );
      }
    });
  }
}
