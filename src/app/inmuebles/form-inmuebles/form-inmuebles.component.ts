import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlojamientosService } from '../inmueble.service';
import { Inmueble } from '../inmueble';
import { Caracteristicas } from '../caracteristicas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-inmuebles',
  templateUrl: './form-inmuebles.component.html',
  styleUrls: ['./form-inmuebles.component.css']
})
export class FormInmueblesComponent implements OnInit {
  caracteriscas: Caracteristicas [] = []
  selectedFiles: File[] = [];
  selectedFilePreviews: string[] = [];
  inmuebleForm!: FormGroup;
  isEditMode = false;
  inmuebleId!: number;
  caracteristicas: any [] = []

  tipo: string = '';

  constructor(
    private fb: FormBuilder,
    private inmuebleServicio: AlojamientosService,
    private router: Router
  ) {}


onFilesSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    const filesArray = Array.from(input.files);
    const totalFiles = this.selectedFiles.length + filesArray.length;

    if (totalFiles > 5) {
      alert('Solo puedes subir un máximo de 5 imágenes.');
      return;
    }

    filesArray.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFilePreviews.push(reader.result as string);
      };
      reader.readAsDataURL(file);

      this.selectedFiles.push(file);
    });
  }
}

removeFile(index: number): void {
  this.selectedFiles.splice(index, 1);
  this.selectedFilePreviews.splice(index, 1);
}

  onTipoChange(event: any): void {
    this.tipo = event.target.value; 
    console.log('Tipo changed to:', this.tipo); 
  }

  ngOnInit(): void {
    this.inmuebleForm = this.fb.group({
      tipo: ['', Validators.required],
      nombre_inmueble: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.maxLength(200)]],
      renta: [, [Validators.required, Validators.min(1)]],
      ubicacion: ['', [Validators.required, Validators.maxLength(255)]],
      codigo_postal: [, [Validators.required, Validators.min(1000)]],
      calificacion: [0]
    });

    this.inmuebleForm.get('tipo')?.valueChanges.subscribe(tipo => {
      this.tipo = tipo;
      this.actualizarCamposDinamicos(tipo);
    });
  }


  actualizarCamposDinamicos(tipo: string): void {
    const camposDinamicos = [
      'rentamax',
      'tipo_unidad',
      'cantidad_unidades',
      'unidades_disponibles',
      'tipo',
      'cantidad_cuartos',
      'cuartos_disponibles',
      'ocupado'
    ];
    camposDinamicos.forEach(campo => {
      if (this.inmuebleForm.contains(campo)) {
        this.inmuebleForm.removeControl(campo);
      }
    });
    this.inmuebleForm.addControl('tipo', this.fb.control('', [Validators.required]))

    if (tipo === 'Edificio') {
      this.inmuebleForm.addControl('rentamax', this.fb.control(0, [ Validators.min(0)]));
      this.inmuebleForm.addControl('tipo_unidad', this.fb.control('', Validators.required));
      this.inmuebleForm.addControl('cantidad_unidades', this.fb.control('', [Validators.required, Validators.min(1)]));
      this.inmuebleForm.addControl('unidades_disponibles', this.fb.control('', [Validators.required, Validators.min(0)]));
    } else if (tipo === 'Casa') {
      this.inmuebleForm.addControl('tipo', this.fb.control('', Validators.required));
      this.inmuebleForm.addControl('cantidad_cuartos', this.fb.control('', [Validators.required, Validators.min(1)]));
      this.inmuebleForm.addControl('cuartos_disponibles', this.fb.control(0, [Validators.min(0)]));
    } else if (tipo === 'Unidad') {
      this.inmuebleForm.addControl('tipo', this.fb.control('', Validators.required));
      this.inmuebleForm.addControl('ocupado', this.fb.control(false));
    }
  }

  onSubmit(): void {
    if (this.inmuebleForm.valid) {
      const inmuebleData = this.inmuebleForm.value;
  
      if (this.isEditMode) {
        this.inmuebleServicio.updateInmueble(this.inmuebleId, inmuebleData).subscribe(
          (updatedInmueble) => {
            if (this.selectedFiles.length > 0) {
              this.uploadImages('inmueble', updatedInmueble.idinmuebles);
            }
            Swal.fire({
              icon: 'success',
              title: 'Inmueble actualizado',
              text: 'El inmueble se actualizó correctamente.',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              this.router.navigate(['/alojamientos']);
            });
          },
          (error) => {
            console.error('Error al actualizar el inmueble:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un problema al actualizar el inmueble.',
              confirmButtonText: 'Aceptar'
            });
          }
        );
      } else {
        this.inmuebleServicio.addInmueble(this.tipo, inmuebleData).subscribe(
          (newInmueble) => {
            if (newInmueble && newInmueble.idinmuebles) {
              if (this.selectedFiles.length > 0) {
                this.uploadImages('inmueble', newInmueble.idinmuebles);
              }
              Swal.fire({
                icon: 'success',
                title: 'Inmueble creado',
                text: 'El inmueble fue creado exitosamente.',
                confirmButtonText: 'Aceptar'
              }).then(() => {
                this.router.navigate(['/inmuebles/agregar/servicios', newInmueble.idinmuebles]);
              });
            } else {
              console.error('El backend no devolvió un ID para el inmueble creado.');
            }
          },
          (error) => {
            console.error('Error al agregar el inmueble:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un problema al agregar el inmueble.',
              confirmButtonText: 'Aceptar'
            });
          }
        );
      }
    }
  }
  
  
  uploadImages(entity: string, entityId: number): void {
    if (this.selectedFiles.length > 0) {
        this.inmuebleServicio.uploadImages(entity, entityId, this.selectedFiles).subscribe(
            () => console.log('Imágenes subidas correctamente'),
            (error) => console.error('Error al subir imágenes:', error)
        );
    }
}
 
  onCancel(): void {
    this.router.navigate(['/inmueble']);
  }
}
