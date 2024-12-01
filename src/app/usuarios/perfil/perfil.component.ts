import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginserviceService } from '../../login/loginservice.service';
import { UsuarioService } from '../usuarios.service';
import { UsuarioBase, Foraneo, Vendedor, Arrendador } from '../usuario-base';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  profileForm!: FormGroup;
  userRole: string | null = '';
  userId: number | null = null;
  userData: UsuarioBase | Foraneo | Vendedor | Arrendador | null = null;
  foraneoData: Foraneo | null = null;
  vendedorData: Vendedor | null = null;
  arrendadorData: Arrendador | null = null;
  selectedFile: File | null = null;
  selectedFilePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginserviceService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFilePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  verificarImagen(): boolean {
    return !!(this.userData && (this.userData as any).imagenes?.length > 0);
  }
  
  obtenerImagenUsuario(): string {
    const baseUrl = 'http://3.213.191.244:8000/';
    if (this.userData && (this.userData as any).imagenes?.length > 0) {
      return baseUrl + (this.userData as any).imagenes[0].file_path;
    }
    return 'assets/images/default-avatar.png'; 
  } 

  deleteUserImage(image: { id: number, file_path: string }): void {
    const entity = 'usuario';
      Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminada la imagen, no podrás recuperarla.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteUserImage(image.id, entity).subscribe(
          () => {
            Swal.fire('¡Eliminado!', 'La imagen ha sido eliminada con éxito.', 'success');
            this.selectedFilePreview = null;
            this.obtenerDatosUsuario(this.userId as number);
          },
          (error) => {
            console.error('Error al eliminar la imagen:', error);
            Swal.fire('Error', 'Hubo un problema al eliminar la imagen.', 'error');
          }
        );
      }
    });
  }

  uploadUserImage(): void {
    if (!this.selectedFile || this.userId === null) {
      Swal.fire('Error', 'Por favor selecciona una imagen primero o asegúrate de estar autenticado.', 'error');
      return;
    }
  
    Swal.fire({
      title: 'Subiendo imagen...',
      text: 'Por favor espera un momento mientras se sube la imagen.',
      icon: 'info',
      showCancelButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading(); 
      }
    });
  
    this.usuarioService.uploadUserImage(this.userId, this.selectedFile).subscribe(
      () => {
        Swal.close();
        Swal.fire('¡Éxito!', 'La imagen se ha subido con éxito.', 'success');
          this.obtenerDatosUsuario(this.userId as number);
          this.selectedFile = null;
          this.selectedFilePreview = null;
      },
      (error) => {
        Swal.close();
        console.error('Error al subir la imagen:', error);
        Swal.fire('Error', 'Hubo un problema al subir la imagen.', 'error');
      }
    );
  }
  
  onSubmit(): void {
    if (this.profileForm.valid) {
      const updatedUserData = this.profileForm.value;
      this.usuarioService
        .actualizarUsuario(this.userRole as any, this.userId as number, updatedUserData)
        .subscribe(
          (response) => {
            alert('Perfil actualizado con éxito.');
            if (this.selectedFile) {
              this.uploadUserImage(); 
            }
          },
          (error) => {
            console.error('Error al actualizar el perfil:', error);
            alert('Error al actualizar el perfil.');
          }
        );
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }
  
    
  ngOnInit(): void {

    this.userRole = this.loginService.getUserRole();
    this.userId = this.loginService.getUserId();

    if (this.userId) {
      this.obtenerDatosUsuario(this.userId);
    }

    this.profileForm = this.fb.group({
      nombre: ['', Validators.required],
      sexo: ['', Validators.required],
      tipoUsuario: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
    });
  }

  obtenerDatosUsuario(id: number): void {
    let userObservable: Observable<any>;

    switch (this.userRole) {
      case 'foraneo':
        userObservable = this.usuarioService.obtenerForaneo(id); 
        break;
      case 'vendedor':
        userObservable = this.usuarioService.obtenerVendedor(id); 
        break;
      case 'arrendador':
        userObservable = this.usuarioService.obtenerArrendador(id); 
        break;
      default:
        return;
    }

    userObservable.subscribe((data) => {
      this.userData = data;
      if (this.userRole === 'foraneo') {
        this.foraneoData = data as Foraneo;
      } else if (this.userRole === 'vendedor') {
        this.vendedorData = data as Vendedor;
      } else if (this.userRole === 'arrendador') {
        this.arrendadorData = data as Arrendador;
      }

      this.cargarDatosEnFormulario(data);
    });
  }


  cargarDatosEnFormulario(data: UsuarioBase | Foraneo | Vendedor | Arrendador): void {
    this.profileForm.patchValue({
      nombre: data.nombre,
      sexo: data.sexo,
      correo: data.correo,
      telefono: data.telefono,
      contrasena: data.contrasena,
    });
  }

  navigateEditar(): void {
    this.userRole = this.loginService.getUserRole();
    this.userId = this.loginService.getUserId();
    this.router.navigate(['/editarPerfil', this.userRole, this.userId]);
  }
  
  eliminarUsuario(): void {
    this.userId = this.loginService.getUserId();
  
    if (!this.userId) {
      Swal.fire('Error', 'No se encontró el ID del usuario.', 'error');
      return;
    }
  
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará tu cuenta de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed && this.userId) {

        let eliminarObservable: Observable<any>;
  
        switch (this.userRole) {
          case 'foraneo':
            eliminarObservable = this.usuarioService.eliminarForaneo(this.userId);
            break;
          case 'vendedor':
            eliminarObservable = this.usuarioService.eliminarVendedor(this.userId);
            break;
          case 'arrendador':
            eliminarObservable = this.usuarioService.eliminarArrendador(this.userId);
            break;
          default:
            Swal.fire('Error', 'Rol de usuario no válido.', 'error');
            return;
        }
  
        eliminarObservable.subscribe(
          () => {
            Swal.fire('¡Eliminado!', 'Tu cuenta ha sido eliminada con éxito.', 'success');
            this.router.navigate(['/inicio']); 
          },
          (error) => {
            console.error('Error al eliminar el usuario:', error);
            Swal.fire('Error', 'Hubo un problema al eliminar el usuario.', 'error');
          }
        );
      } else {
        Swal.fire('Cancelado', 'Tu cuenta no se ha eliminado.', 'info');
      }
    });
  }
  
  
}
