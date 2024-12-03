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
  userId!: number | null;
  searchText: string = '';

  constructor(private comidaService: ComidaService,
              private loginService: LoginserviceService,
              private router: Router,) {}

  ngOnInit(): void {
  this.loginService.userRole$.subscribe((role) => {
    this.userRole = role;
    this.loadMenusForRole();
  });

  // Suscríbete a los cambios en comidas$
  this.comidaService.comidas$.subscribe((menus) => {
    this.comidas = menus;
  });
}

private loadMenusForRole(): void {
  // Aquí puedes filtrar los menús según el rol del usuario si es necesario
  this.comidaService.getComidas().subscribe(
    (data) => {
      this.comidas = data;
    },
    (error) => {
      console.error('Error al obtener las comidas:', error);
    }
  );
}


  get filteredComidas() {
    if (!this.searchText.trim()) {
      return this.comidas;
    }
    return this.comidas.filter(comida =>
      comida.nombre.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  Agregar() {
    this.router.navigate(['comida/agregar']);
  }
}
