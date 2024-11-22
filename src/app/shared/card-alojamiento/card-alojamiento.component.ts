import { Component, Input } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-card-alojamiento',
  templateUrl: './card-alojamiento.component.html',
  styleUrl: './card-alojamiento.component.css'
})
export class CardAlojamientoComponent {

  @Input() alojamiento: any;
}
