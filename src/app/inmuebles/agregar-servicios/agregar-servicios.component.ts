import { Component, OnInit } from '@angular/core';
import { CaracteristicasService } from '../caracteristicas.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-servicios',
  templateUrl: './agregar-servicios.component.html',
  styleUrls: ['./agregar-servicios.component.css']
})
export class AgregarServiciosComponent implements OnInit {
  servicios: any[] = [];
  selectedServicios: Set<number> = new Set(); 
  inmuebleId!: number;

  constructor(
    private serviciosService: CaracteristicasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.inmuebleId = +params['id'];
    });

    this.serviciosService.getServicios().subscribe(
      (data) => {
        this.servicios = data;
      },
      (error) => console.error('Error al obtener servicios:', error)
    );
  }

  toggleServicio(idservicio: number, event: Event): void {
    const checkbox = event.target as HTMLInputElement; // Aseguramos el tipo del evento
    const isChecked = checkbox.checked;
  
    if (isChecked) {
      this.selectedServicios.add(idservicio);
    } else {
      this.selectedServicios.delete(idservicio);
    }
  }
  
  onSubmit(): void {
    if (this.selectedServicios.size === 0) {
      return;
    }

    const requests = Array.from(this.selectedServicios).map(idservicio =>
      this.serviciosService.addServicioInmueble(idservicio, this.inmuebleId)
    );

    Promise.all(requests.map(req => req.toPromise()))
    Swal.fire({
      icon: 'success',
      title: 'Servicios agregados',
      text: 'Los servicios fueron agregados exitosamente.',
      confirmButtonText: 'Aceptar'
    }).then(() => {
        this.router.navigate(['/alojamientos']); 
      })
      .catch((error) => console.error('Error al asignar servicios:', error));
  }
}