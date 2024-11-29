import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css'],
})
export class RegistrarUsuarioComponent implements OnInit {
  RegistrerForm!: FormGroup;
  tipoUsuario: string = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.RegistrerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/)]],
      apellidos: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/)]],
      sexo: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      contrasena: [
        '', 
        [
          Validators.required, 
          Validators.minLength(6), 
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
        ]
      ],
      tipoUsuario: ['', Validators.required],
      nacimiento: [''],
      ubicacion: [''],
      descripcion: ['']
    });

    this.RegistrerForm.get('tipoUsuario')?.valueChanges.subscribe(tipo => {
      this.tipoUsuario = tipo;
      this.actualizarFormularioSegunTipo(tipo);
    });
  }  

  actualizarFormularioSegunTipo(tipo: string): void {
    const camposAdicionales: Record<
      string,
      { [key: string]: [string, any] }
    > = {
      Foraneo: { nacimiento: ['', Validators.required] },
      Vendedor: { ubicacion: ['', Validators.required] },
      Arrendador: { descripcion: ['', Validators.required] },
    };
  
    Object.keys(this.RegistrerForm.controls).forEach(control => {
      if (control in camposAdicionales[tipo]) {
        this.RegistrerForm.removeControl(control);
      }
    });
  
    if (camposAdicionales[tipo]) {
      Object.entries(camposAdicionales[tipo]).forEach(([campo, config]) => {
        this.RegistrerForm.addControl(campo, this.fb.control(...config));
      });
    }
  }
  
  onSubmit(): void {
    if (this.RegistrerForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Formulario inválido',
        text: 'Por favor completa todos los campos correctamente.',
      });
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas crear esta cuenta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#154667',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, crear',
    }).then((result) => {
      if (result.isConfirmed) {
        const tipo = this.RegistrerForm.value.tipoUsuario;
  
        const formData = {
          ...this.RegistrerForm.value,
          nombre: `${this.RegistrerForm.value.nombre} ${this.RegistrerForm.value.apellidos}`.trim(),
        };
    
        
      
        this.usuarioService.registrarUsuario(tipo, formData).subscribe(
          response => {
            Swal.fire(
              'El usuario ha sido registrado con éxito.',
              'success'
            );        this.router.navigate(['/']);
          },
          (error) => {
            console.error(error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ocurrió un error al registrar el usuario.',
            });
          }
        );
      }
    });
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
        this.router.navigate(['/']);
      }
    });
  }
}