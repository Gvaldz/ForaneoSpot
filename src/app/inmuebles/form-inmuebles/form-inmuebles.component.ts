import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlojamientosService } from '../alojamientos.service';
import { Inmueble } from '../inmueble';

@Component({
  selector: 'app-form-inmuebles',
  templateUrl: './form-inmuebles.component.html',
  styleUrls: ['./form-inmuebles.component.css']
})
export class FormInmueblesComponent implements OnInit {
  selectedFiles: File[] = [];
  selectedFilePreviews: string[] = [];
  inmuebleForm!: FormGroup;
  isEditMode = false;
  inmuebleId!: number;

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
      'tipo',
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
            this.router.navigate(['/alojamientos']);
          },
          (error) => console.error('Error al actualizar el inmueble:', error)
        );
      } else {
        this.inmuebleServicio.addInmueble(this.tipo, inmuebleData).subscribe(
          (newInmueble) => {
            if (newInmueble && newInmueble.idinmuebles) { 
              console.log('Inmueble creado con ID:', newInmueble.idinmuebles);
              if (this.selectedFiles.length > 0) {
                this.uploadImages('inmueble', newInmueble.idinmuebles); 
              }
              this.router.navigate(['/alojamientos']);
            } else {
              console.error('El backend no devolvió un ID para el inmueble creado.');
            }
          },
          (error) => console.error('Error al agregar el inmueble:', error)
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
