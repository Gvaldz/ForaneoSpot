import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.css'
})
export class RegistrarUsuarioComponent {

  RegistrerForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this. RegistrerForm = this.fb.group({
      nombre: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\\s]+$')] // Solo letras y espacios
      ],
      apellidos: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\\s]+$')] // Solo letras y espacios
      ],
      sexo: ['', Validators.required], // Selección requerida
      email: [
        '',
        [Validators.required, Validators.email] // Formato de email válido
      ],
      telefono: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')] // Solo números, 10 dígitos
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8), // Longitud mínima de 8 caracteres
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$') // Al menos 1 mayúscula, 1 minúscula y 1 número
        ]
      ],
      tipoUsuario: ['', Validators.required], // Selección requerida
      descripcion: ['', Validators.required] // Campo obligatorio
    });
  }

  onSubmit(): void {
    if (this.RegistrerForm.valid) {
      console.log('Formulario enviado con éxito:', this.RegistrerForm.value);
      // Aquí puedes manejar el envío de los datos (API, servicio, etc.)
    } else {
      console.log('Formulario no válido. Corrige los errores.');
      this.RegistrerForm.markAllAsTouched(); // Marca todos los campos como tocados para mostrar errores
    }
  }
}
