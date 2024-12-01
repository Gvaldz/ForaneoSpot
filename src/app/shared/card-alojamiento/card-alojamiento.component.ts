import { Component, Input } from '@angular/core';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-card-alojamiento',
  templateUrl: './card-alojamiento.component.html',
  styleUrl: './card-alojamiento.component.css'
})
export class CardAlojamientoComponent {

  @Input() alojamiento: any;

  constructor(private router: Router) {}

  verDetalles(id: number): void {
    this.router.navigate(['/detalles', id]);
  }
}
