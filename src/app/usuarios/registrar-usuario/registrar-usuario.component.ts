import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css'],
})
export class RegistrarUsuarioComponent {

<<<<<<<<< Temporary merge branch 1
  RegistrerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.RegistrerForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      tipoUsuario: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
  }

  // Método para regresar a la página anterior
  regresar(): void {
    this.router.navigate(['/inicio']);
  }

  // Método para enviar el formulario
  crearCuenta(): void {
    if (this.RegistrerForm.valid) {
      console.log('Formulario válido. Datos:', this.RegistrerForm.value);
      // Aquí puedes agregar la lógica para enviar los datos al backend
      alert('Cuenta creada exitosamente');
      this.router.navigate(['/inicio']);
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }

  // Método para cancelar la acción
  cancelar(): void {
    this.router.navigate(['/inicio']);
  }
}
=========
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

    const tipo = this.RegistrerForm.value.tipoUsuario;

    const formData = {
      ...this.RegistrerForm.value,
      nombre: `${this.RegistrerForm.value.nombre} ${this.RegistrerForm.value.apellidos}`.trim(),
    };

    this.usuarioService.registrarUsuario(tipo, formData).subscribe(
      response => {
        alert('Usuario registrado con éxito.');
        this.router.navigate(['/']);
      },
      error => {
        console.error(error);
        alert('Ocurrió un error al registrar el usuario.');
      }
    });
  }

}