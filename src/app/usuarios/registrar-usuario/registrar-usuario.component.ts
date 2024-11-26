import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {
  RegistrerForm!: FormGroup;
  tipoUsuario: string = '';

<<<<<<<<< Temporary merge branch 1
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
        alert('Usuario registrado con éxito.');
        this.router.navigate(['/']);
      },
      error => {
        console.error(error);
        alert('Ocurrió un error al registrar el usuario.');
      }
    );
  }
  
=========
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
>>>>>>>>> Temporary merge branch 2
}
