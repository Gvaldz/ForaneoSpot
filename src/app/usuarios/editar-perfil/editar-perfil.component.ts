import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginserviceService } from '../../login/loginservice.service';
import { UsuarioService } from '../usuarios.service';
import { UsuarioBase, Foraneo, Vendedor, Arrendador } from '../usuario-base';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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
    private usuarioService: UsuarioService
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
      this.cargarDatosUsuario(tipoUsuario, id);
    }
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
      const updatedUserData = this.profileForm.value;
      this.usuarioService
        .actualizarUsuario(this.userRole as any, this.userId as number, updatedUserData)
        .subscribe(
          (response) => {
            alert('Perfil actualizado con éxito.');

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
  
}
