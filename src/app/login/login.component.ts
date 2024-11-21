import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginserviceService } from './loginservice.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginserviceService
  ) {

    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { correo, contrasena } = this.loginForm.value;
      console.log('Formulario enviado con:', { correo, contrasena });

      this.loginService.login(correo, contrasena).subscribe(
        (response) => {
          console.log('Login exitoso:', response);
          this.navigateComida();
        },
        (error) => {
          console.error('Error de login:', error);
          this.errorMessage = error;
        }
      );
    } else {
      this.errorMessage = 'Por favor, completa el formulario correctamente.';
    }
  }

  navigateComida(): void {
    this.router.navigate(['/comida']);
  }

  navigateRegistrarUsuario(): void {
    this.router.navigate(['/registrarUsuario']);
  }
}
