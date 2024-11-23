import { Component, OnInit } from '@angular/core';
import { ComidaService } from '../comida.service';
import { LoginserviceService } from '../../login/loginservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comida-home',
  templateUrl: './comida-home.component.html',
  styleUrls: ['./comida-home.component.css']
})
export class ComidaHomeComponent implements OnInit {
  comidas: any[] = [];
  userRole: string | null = '';
  userId: string | null = '';

  constructor(private comidaService: ComidaService, private loginService: LoginserviceService, private router: Router,) {}

  ngOnInit(): void {
    this.userRole = this.loginService.getUserRole();
    console.log(this.userRole);
  
    this.comidaService.comidas$.subscribe(
      (data) => {
        this.comidas = data;
      },
      (error) => {
        console.error('Error al obtener las comidas:', error);
      }
    );
  }

  Agregar() {
    this.router.navigate(['comida/agregar']);  
  }
}
