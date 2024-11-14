import { Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-card-comida',
  templateUrl: './card-comida.component.html',
  styleUrl: './card-comida.component.css'
})
export class CardComidaComponent{

  constructor(private router: Router,) {
  }

  @Input() comida: any; // Recibe un objeto comida a través del decorador @Input

  navegarMenuComida() {
    console.log(`Ordenar comida: ${this.comida.nombre}`);
  }
}
