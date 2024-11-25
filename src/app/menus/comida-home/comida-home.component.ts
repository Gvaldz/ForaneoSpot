import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuFormComponent } from '../menu-form/menu-form.component';

@Component({
  selector: 'app-comida-home',
  templateUrl: './comida-home.component.html',
  styleUrl: './comida-home.component.css'
})
export class ComidaHomeComponent {
  constructor(private router: Router) {}

  navegarAlFormulario() {
    this.router.navigate(['/formulario-comida']);
  }

}
