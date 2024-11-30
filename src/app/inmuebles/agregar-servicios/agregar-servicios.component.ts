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
  
    this.serviciosService.getServiciosInmueble(this.inmuebleId).subscribe(
      (data) => {
        data.forEach(servicio => {
          this.selectedServicios.add(servicio.idservicio);
        });
      },
      (error) => console.error('Error al obtener servicios del inmueble:', error)
    );
  }
  

  toggleServicio(idservicio: number, event: Event): void {
    const checkbox = event.target as HTMLInputElement; 
    const isChecked = checkbox.checked;
  
    if (isChecked) {
      this.selectedServicios.add(idservicio);
    } else {
      this.selectedServicios.delete(idservicio);
    }
  }
  
  onSubmit(): void {
    const serviciosActuales: number[] = Array.from(this.selectedServicios);
  
    this.serviciosService.getServiciosInmueble(this.inmuebleId).subscribe(
      (data) => {
        const serviciosExistentes = data.map((s: any) => s.idservicio);
  
        const serviciosAAgregar = serviciosActuales.filter(
          (id) => !serviciosExistentes.includes(id)
        );
  
        const serviciosAEliminar = serviciosExistentes.filter(
          (id) => !serviciosActuales.includes(id)
        );
  
        const agregarRequests = serviciosAAgregar.map((idservicio) =>
          this.serviciosService.addServicioInmueble(idservicio, this.inmuebleId).toPromise()
        );
  
        const eliminarRequests = serviciosAEliminar.map((idservicio) => {
          const servicioEliminar = data.find(
            (s: any) => s.idservicio === idservicio
          );
          return this.serviciosService.deleteServicioInmueble(servicioEliminar.id).toPromise();
        });
  
        Promise.all([...agregarRequests, ...eliminarRequests])
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Servicios actualizados',
              text: 'Los servicios del inmueble se actualizaron correctamente.',
              confirmButtonText: 'Aceptar',
            }).then(() => this.router.navigate(['/alojamientos']));
          })
          .catch((error) => {
            console.error('Error al actualizar servicios:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un problema al actualizar los servicios.',
              confirmButtonText: 'Aceptar',
            });
          });
      },
      (error) => console.error('Error al obtener servicios actuales:', error)
    );
  }
  
}