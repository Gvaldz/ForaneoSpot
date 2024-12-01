import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { LoginserviceService } from '../../login/loginservice.service';
import { UsuarioService } from '../usuarios.service';
import { UsuarioBase, Foraneo, Vendedor, Arrendador } from '../usuario-base';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})

export class EditarPerfilComponent implements OnInit {
  profileForm!: FormGroup;
  userRole: string | null = '';
  userId: number | null = null;
  userData: UsuarioBase | Foraneo | Vendedor | Arrendador | null = null;
  foraneoData: Foraneo | null = null;
  vendedorData: Vendedor | null = null;
  arrendadorData: Arrendador | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.profileForm = this.fb.group({
      nombre: ['', Validators.required],
      sexo: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      nacimiento: [''],
      ubicacion: [''],   
      descripcion: [''],
    });
  
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const tipoUsuario = this.route.snapshot.paramMap.get('tipoUsuario');
  
    if (id && tipoUsuario) {
      this.userRole = tipoUsuario;
      this.userId = id;
  
      this.setDynamicValidations(tipoUsuario);
  
      this.cargarDatosUsuario(tipoUsuario, id);
    }
  }
  
  setDynamicValidations(userRole: string): void {
    if (userRole === 'foraneo') {
      this.profileForm.get('nacimiento')?.setValidators([Validators.required, this.validarEdadMinima.bind(this)]);
    } else if (userRole === 'vendedor') {
      this.profileForm.get('ubicacion')?.setValidators([Validators.required]);
    } else if (userRole === 'arrendador') {
      this.profileForm.get('descripcion')?.setValidators([Validators.required, Validators.maxLength(500)]);
    }
  
    this.profileForm.get('nacimiento')?.updateValueAndValidity();
    this.profileForm.get('ubicacion')?.updateValueAndValidity();
    this.profileForm.get('descripcion')?.updateValueAndValidity();
  }
  
  validarEdadMinima(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null; 
    }
  
    const fechaNacimiento = new Date(control.value);
    const fechaHoy = new Date();
    const edadMinima = 17;
  
    let edad = fechaHoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = fechaHoy.getMonth() - fechaNacimiento.getMonth();
    const dia = fechaHoy.getDate() - fechaNacimiento.getDate();
  
    if (mes < 0 || (mes === 0 && dia < 0)) {
      edad--;
    }
      return edad >= edadMinima ? null : { edadMinima: { message: `Debes tener al menos ${edadMinima} años.` } };
  }
  
  cargarDatosUsuario(tipoUsuario: string, id: number): void {
    switch (tipoUsuario) {
      case 'foraneo':
        this.usuarioService.obtenerForaneo(id).subscribe(
          (data) => {
            this.cargarDatosEnFormulario(data);
          },
          (error) => console.error('Error al obtener foráneo:', error)
        );
        break;
      case 'vendedor':
        this.usuarioService.obtenerVendedor(id).subscribe(
          (data) => {
            this.cargarDatosEnFormulario(data);
          },
          (error) => console.error('Error al obtener vendedor:', error)
        );
        break;
      case 'arrendador':
        this.usuarioService.obtenerArrendador(id).subscribe(
          (data) => {
            this.cargarDatosEnFormulario(data);
          },
          (error) => console.error('Error al obtener arrendador:', error)
        );
        break;
    }
  }
  
  onSubmit(): void {
    if (this.profileForm.valid) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas guardar los cambios en tu perfil?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, guardar cambios',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedUserData = this.profileForm.value;
          this.usuarioService
            .actualizarUsuario(this.userRole as any, this.userId as number, updatedUserData)
            .subscribe(
              (response) => {
                Swal.fire(
                  'Actualizado',
                  'El usuario ha sido actualizado con éxito.',
                  'success'
                );
                this.router.navigate(['/perfil']);
              },
              (error) => {
                console.error('Error al actualizar el perfil:', error);
                Swal.fire(
                  'Error',
                  'Hubo un problema al actualizar tu perfil.',
                  'error'
                );
              }
            );
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Formulario inválido',
        text: 'Por favor completa todos los campos correctamente.',
      });
    }
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
      console.log('Datos recibidos:', data);

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
    const formValues: any = {
      nombre: data.nombre,
      sexo: data.sexo,
      correo: data.correo,
      telefono: data.telefono,
      contrasena: data.contrasena,
    };
  
    if (this.userRole === 'foraneo') {
      formValues.nacimiento = (data as Foraneo)?.nacimiento || '';
    } else if (this.userRole === 'vendedor') {
      formValues.ubicacion = (data as Vendedor)?.ubicacion || '';
    } else if (this.userRole === 'arrendador') {
      formValues.descripcion = (data as Arrendador)?.descripcion || '';
    }
  
    this.profileForm.patchValue(formValues);
  }

  cancelar(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Los datos ingresados no se guardarán.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#154667',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/perfil']);
      }
    });
  }
}
