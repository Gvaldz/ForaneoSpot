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
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      sexo: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      tipoUsuario: ['', Validators.required],
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
      alert('Por favor completa todos los campos requeridos.');
      return;
    }
  
    const tipo = this.RegistrerForm.value.tipoUsuario;
  
    const formData = {
      ...this.RegistrerForm.value,
      nombre: `${this.RegistrerForm.value.nombre} ${this.RegistrerForm.value.apellidos}`.trim(),
    };
  
    this.usuarioService.registrarUsuario(tipo, formData).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Usuario creado',
          text: 'El usuario fue creado exitosamente.',
          confirmButtonText: 'Aceptar'
        })
        this.router.navigate(['/comida']);
      },
      error => {
        console.error(error);
        alert('Ocurrió un error al registrar el usuario.');
      }
    );
  }
  
}