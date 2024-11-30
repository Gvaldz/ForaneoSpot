import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlojamientosService } from '../inmueble.service';
import { Caracteristicas } from '../caracteristicas';
import Swal from 'sweetalert2';
import { error } from 'console';

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
  tipo_inmueble: string = '';

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
    this.tipo_inmueble = event.target.value; 
  }

  ngOnInit(): void {
    this.inmuebleForm = this.fb.group({
      tipo_inmueble: ['', Validators.required],
      nombre_inmueble: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.maxLength(200)]],
      renta: [, [Validators.required, Validators.min(1)]],
      ubicacion: ['', [Validators.required, Validators.maxLength(255)]],
      codigo_postal: [, [Validators.required, Validators.min(1000)]],
      calificacion: [0]
    });

    this.inmuebleForm.get('tipo_inmueble')?.valueChanges.subscribe(tipo => {
      this.tipo_inmueble = tipo; 
      this.actualizarCamposDinamicos(tipo);
    });
    
  }

  actualizarCamposDinamicos(tipo_inmueble: string): void {
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
  
    if (tipo_inmueble === 'Edificio') {
      this.inmuebleForm.addControl('rentamax', this.fb.control('', Validators.min(0)));
      this.inmuebleForm.addControl('tipo_unidad', this.fb.control('', Validators.required));
      this.inmuebleForm.addControl('cantidad_unidades', this.fb.control('', [Validators.required, Validators.min(1)]));
      this.inmuebleForm.addControl('unidades_disponibles', this.fb.control('', [Validators.required, Validators.min(0)]));
    } else if (tipo_inmueble === 'Casa') {
      this.inmuebleForm.addControl('tipo', this.fb.control('', Validators.required));
      this.inmuebleForm.addControl('cantidad_cuartos', this.fb.control('', [Validators.required, Validators.min(1)]));
      this.inmuebleForm.addControl('cuartos_disponibles', this.fb.control(0, this.inmuebleForm.get('tipo')?.value === 'Compartida' ? Validators.min(0) : null)
      );    } else if (tipo_inmueble === 'Unidad') {
      this.inmuebleForm.addControl('tipo', this.fb.control('', Validators.required));
      this.inmuebleForm.addControl('ocupado', this.fb.control(false));
    }
  }
  
  onSubmit(): void {
    if (!this.inmuebleForm.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el formulario',
        text: 'Por favor, completa todos los campos obligatorios.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }
  
    if (this.selectedFiles.length < 1) {
      Swal.fire({
        icon: 'error',
        title: 'Imágenes faltantes',
        text: 'Debes subir al menos una imagen para continuar.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }
  
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas guardar este inmueble?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#154667',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        const inmuebleData = this.inmuebleForm.value;
  
        if (this.isEditMode) {
          this.inmuebleServicio.updateInmueble(this.inmuebleId, inmuebleData).subscribe(
            () => {
              Swal.fire({
                icon: 'success',
                title: 'Inmueble actualizado',
                text: 'El inmueble se actualizó correctamente.',
                confirmButtonText: 'Aceptar',
              }).then(() => {
                this.router.navigate(['/alojamientos']);
              });
            },
            () => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al actualizar el inmueble.',
                confirmButtonText: 'Aceptar',
              });
            }
          );
        } else {
          this.inmuebleServicio.addInmueble(this.tipo_inmueble, inmuebleData).subscribe(
            (newInmueble) => {
              if (newInmueble && newInmueble.idinmuebles) {
                console.log('Respuesta del servidor:', newInmueble);
                if (this.selectedFiles.length > 0) {
                  this.uploadImages('inmueble', newInmueble.idinmuebles);
                }
                Swal.fire({
                  icon: 'success',
                  title: 'Inmueble creado',
                  text: 'El inmueble fue creado exitosamente.',
                  confirmButtonText: 'Aceptar',
                }).then(() => {
                  this.router.navigate(['/inmuebles/agregar/servicios', newInmueble.idinmuebles]);
                });
              }
            },
            (error) => {
              console.error('Error al guardar:', error);

              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al crear el inmueble.',
                confirmButtonText: 'Aceptar',
                
              });  
            }
          );
        }
      }
    });
  }
  
  onCancel(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Los cambios realizados no se guardarán.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#154667',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/inmueble']);
      }
    });
  }
  
  uploadImages(entity: string, entityId: number): void {
    if (this.selectedFiles.length > 0) {
        this.inmuebleServicio.uploadImages(entity, entityId, this.selectedFiles).subscribe(
            () => console.log('Imágenes subidas correctamente'),
            (error) => console.error('Error al subir imágenes:', error)
        );
    }
  }
}
