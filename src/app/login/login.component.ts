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
          if(this.userRole == "vendedor" || this.userRole == "foraneo"){
            this.navigateComida()
          }else{
          this.navigateInmuebles()
        }
        },
        (error) => {
          console.error('Error en el login:', error);
        }
      );
      
    } else {
      this.errorMessage = 'Por favor, completa el formulario correctamente.';
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
