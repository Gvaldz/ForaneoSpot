import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComidaService } from '../comida.service';
import { Comida } from '../comida';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.css'],
})

export class MenuFormComponent implements OnInit {
  selectedFiles: File[] = [];
  menuForm!: FormGroup;
  isEditMode = false;
  menuId!: number;
  idopinion: number = 0;
  selectedFile: File | null = null;
  selectedFilePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private comidaService: ComidaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.menuForm = this.fb.group({
      id: [0],
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.maxLength(200)]],
      precio: [, [Validators.required, Validators.min(1)]],
    });

    const menuId = +this.route.snapshot.paramMap.get('id')!;
    if (menuId) {
      this.isEditMode = true;
      this.menuId = menuId;
      this.comidaService.getComidas().subscribe((menus: Comida[]) => {
        const menuToEdit = menus.find(menu => menu.id === menuId);
        if (menuToEdit) {
          this.menuForm.patchValue(menuToEdit);
        }
      });
    }
  }

onSubmit(): void {
  if (this.menuForm.valid) {
    const menuData = this.menuForm.value;

    Swal.fire({
      title: this.isEditMode ? '¿Guardar cambios?' : '¿Guardar nuevo menú?',
      text: this.isEditMode
        ? 'Estás a punto de guardar los cambios realizados en este menú.'
        : 'Estás a punto de guardar un nuevo menú.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.isEditMode) {
          this.comidaService.updateComida(this.menuId, menuData).subscribe(
            (updatedMenu) => {
              if (this.selectedFile) {
                this.uploadImages('menu', updatedMenu.id);
              }
              Swal.fire('Guardado', 'El menú ha sido actualizado correctamente.', 'success');
              this.router.navigate(['/comida']);
              this.router.navigate(['/comida']).then(() => {
                window.location.reload(); 
              });
            },
            (error) => {
              console.error('Error al actualizar el menú:', error);
              Swal.fire('Error', 'No se pudo actualizar el menú.', 'error');
            }
          );
        } else {
          this.comidaService.addComida(menuData).subscribe(
            (newMenu) => {
              if (this.selectedFile) {
                this.uploadImages('menu', newMenu.id);
              }
              Swal.fire('Guardado', 'El nuevo menú ha sido guardado correctamente.', 'success');
              this.router.navigate(['/comida']).then(() => {
                window.location.reload(); 
              });
            },
            (error) => {
              console.error('Error al agregar el menú:', error);
              Swal.fire('Error', 'No se pudo guardar el nuevo menú.', 'error');
            }
          );
        }
      }
    });
  } else {
    Swal.fire('Formulario inválido', 'Por favor, completa los campos requeridos.', 'warning');
  }
}


  uploadImages(entity: string, entityId: number): void {
    if (this.selectedFile) {
      this.comidaService.uploadImages(entity, entityId, [this.selectedFile]).subscribe(
        () => console.log('Imágenes subidas correctamente'),
        (error) => console.error('Error al subir imágenes:', error)
      );
    }
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFilePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onCancel(): void {
    this.router.navigate(['/comida']);
  }

}
