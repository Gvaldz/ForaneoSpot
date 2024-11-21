import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comida-home',
  templateUrl: './comida-home.component.html',
  styleUrl: './comida-home.component.css'
})
export class ComidaDashComponent {
  constructor(private router: Router) {}

  navegarAlFormulario() {
    this.router.navigate(['/formulario-comida']);
  }

}
