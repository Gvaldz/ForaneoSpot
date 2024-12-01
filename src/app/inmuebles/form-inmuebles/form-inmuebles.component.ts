import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlojamientosService } from '../inmueble.service';
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
  tipo_inmueble: string = '';
  isImageUploaded: boolean = false;
  selectedInitialImages: string[] = []; 
  removedImageIds: number[] = []; 
  initialImages: any[] = [];

  constructor(
    private fb: FormBuilder,
    private inmuebleServicio: AlojamientosService,
    private router: Router,
    private route: ActivatedRoute 
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
  const previewToRemove = this.selectedFilePreviews[index];

  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará la imagen seleccionada.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      const imageToRemove = this.initialImages.find(img => img.file_path === previewToRemove);

      console.log('Imagen a eliminar:', previewToRemove);
      console.log('Imagen encontrada:', imageToRemove);

      if (imageToRemove?.id) {
        this.removeFileById(imageToRemove);
      } 
      this.selectedFilePreviews.splice(index, 1);
      this.selectedFiles.splice(index, 1);

      Swal.fire('Eliminada', 'La imagen ha sido eliminada.', 'success');
    } 
  });
}


removeFileById(image: { id: number }): void {
  if (!image || !image.id) {
    console.error('Imagen no válida para eliminar');
    return;
  }

  this.inmuebleServicio.deleteInmuebleImage(image.id).subscribe(
    () => {
      this.initialImages = this.initialImages.filter(img => img.id !== image.id);
    },

  );
}

  onTipoChange(event: any): void {
    this.tipo_inmueble = event.target.value; 
  }

  ngOnInit(): void {
    const tipo_inmueble = this.route.snapshot.paramMap.get('tipo_inmueble');
    const id = this.route.snapshot.paramMap.get('id'); 
    if (id && tipo_inmueble) {
      this.isEditMode = true;
      this.inmuebleId = +id; 
      this.cargarInmueble(tipo_inmueble, this.inmuebleId); 
    }
  
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

    if (this.selectedFilePreviews.length > 0) {
      this.isImageUploaded = true;
    }
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
          this.inmuebleServicio.updateInmueblePorTipo(this.tipo_inmueble, this.inmuebleId, inmuebleData).subscribe(
            () => {
              if (this.removedImageIds.length > 0) {
                console.log('Imágenes a eliminar:', this.removedImageIds);
                this.removedImageIds.forEach((imageId) => {
                  this.inmuebleServicio.deleteInmuebleImage(imageId).subscribe(
                    () => console.log(`Imagen ${imageId} eliminada`),
                    (error) => console.error('Error al eliminar imagen:', error)
                  );
                });
              }
  
              if (this.selectedFiles.length > 0) {
                this.uploadImages('inmueble', this.inmuebleId);
              }
  
              Swal.fire({
                icon: 'success',
                title: 'Inmueble actualizado',
                text: 'El inmueble se actualizó correctamente.',
                confirmButtonText: 'Aceptar',
              }).then(() => this.router.navigate(['/inmuebles/agregar/servicios', this.inmuebleId]));
            },
            (error) => {
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
                if (this.selectedFiles.length > 0) {
                  this.uploadImages('inmueble', newInmueble.idinmuebles);
                }
                Swal.fire({
                  icon: 'success',
                  title: 'Inmueble creado',
                  text: 'El inmueble fue creado exitosamente.',
                  confirmButtonText: 'Aceptar',
                }).then(() => this.router.navigate(['/inmuebles/agregar/servicios', newInmueble.idinmuebles]));
              }
            },
            (error) => {
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
        this.router.navigate(['/alojamientos']);
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

  cargarInmueble(tipo_inmueble: string, id: number): void {
    this.inmuebleServicio.getInmueblePorId(tipo_inmueble, id).subscribe(
      (inmueble) => {
        this.inmuebleForm.patchValue({
          tipo_inmueble: inmueble.tipo_inmueble,
          nombre_inmueble: inmueble.nombre_inmueble,
          descripcion: inmueble.descripcion,
          renta: inmueble.renta,
          ubicacion: inmueble.ubicacion,
          codigo_postal: inmueble.codigo_postal,
          calificacion: inmueble.calificacion,
        });
  
        this.tipo_inmueble = inmueble.tipo_inmueble;
        this.actualizarCamposDinamicos(inmueble.tipo_inmueble);
        
        if (inmueble.tipo_inmueble === 'Edificio') {
          this.inmuebleForm.patchValue({
            rentamax: inmueble.rentamax,
            tipo_unidad: inmueble.tipo_unidad,
            cantidad_unidades: inmueble.cantidad_unidades,
            unidades_disponibles: inmueble.unidades_disponibles
          });
        } else if (inmueble.tipo_inmueble === 'Casa') {
          this.inmuebleForm.patchValue({
            tipo: inmueble.tipo,
            cantidad_cuartos: inmueble.cantidad_cuartos,
            cuartos_disponibles: inmueble.cuartos_disponibles
          });
        } else if (inmueble.tipo_inmueble === 'Unidad') {
          this.inmuebleForm.patchValue({
            tipo: inmueble.tipo,
            ocupado: inmueble.ocupado
          });
        }
  
        if (inmueble.imagenes) {
          this.initialImages = inmueble.imagenes.map((img: any) => ({
            id: img.id,
            file_path: `http://3.213.191.244:8000/${img.file_path}`, 
          }));
        
          this.selectedInitialImages = this.initialImages.map(img => img.file_path);
          this.selectedFilePreviews = [...this.selectedInitialImages];
        }
        
        
      },
      (error) => console.error('Error al cargar el inmueble:', error)
    );
  }
  
}
