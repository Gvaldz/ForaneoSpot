import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent {

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