import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
      apellidos: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/), Validators.minLength(2), Validators.maxLength(50)]],
      sexo: ['', Validators.required],
      tipoUsuario: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/)]],
      descripcion: ['', [Validators.maxLength(200)]]
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log('Formulario válido:', this.profileForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}
