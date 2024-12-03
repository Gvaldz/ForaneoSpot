import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginserviceService } from './loginservice.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';
  userRole: string | null = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginserviceService,
  ) {

    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.userRole = this.loginService.getUserRole();
   }

   onSubmit(): void {
    if (this.loginForm.valid) {
      const { correo, contrasena } = this.loginForm.value;
  
      this.loginService.login(correo, contrasena).subscribe(
        (response) => {
          this.userRole = this.loginService.getUserRole();
          if (this.userRole === "vendedor") {
            Swal.fire({
              icon: 'success',
              title: '¡Bienvenido!',
              text: 'Acceso correcto, redirigiendo a la sección de comida...',
            }).then(() => {
              this.navigateComida();
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: '¡Bienvenido!',
              text: 'Acceso correcto, redirigiendo a la sección de inmuebles...',
            }).then(() => {
              this.navigateInmuebles();
            });
          }
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Credenciales incorrectas',
            text: 'Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.',
          });
        }
      );
  
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario Incompleto',
        text: 'Por favor, completa todos los campos correctamente antes de enviar.',
      });
    }
  }
  

  navigateComida(): void {
    this.router.navigate(['/comida']);
  }

  navigateInmuebles():void{
    this.router.navigate(['/alojamientos'])
  }

  navigateRegistrarUsuario(): void {
    this.router.navigate(['/registrarUsuario']);
  }
}
