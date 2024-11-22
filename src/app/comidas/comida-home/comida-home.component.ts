import { Component, OnInit } from '@angular/core';
import { ComidaService } from '../comida.service';
import { LoginserviceService } from '../../login/loginservice.service';

@Component({
  selector: 'app-comida-home',
  templateUrl: './comida-home.component.html',
  styleUrls: ['./comida-home.component.css']
})
export class ComidaHomeComponent implements OnInit {
  comidas: any[] = [];
  userRole: string | null = '';
  userId: string | null = '';

  constructor(private comidaService: ComidaService, private login: LoginserviceService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('authToken'); 
    
    if (token) {

  
      this.comidaService.obtenerComidas().subscribe(
        (data) => {
          this.comidas = data; 
        },
        (error) => {
          console.error('Error al obtener las comidas:', error);
        }
      );
    } else {
      console.error('No se encontró el token en localStorage');
    }
  }
  
  
}
