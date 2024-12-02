import { Component, Input } from '@angular/core';
import {Product} from '../product.model';

@Component({
  selector: 'app-guia-card',
  templateUrl: './guia-card.component.html',
  styleUrl: './guia-card.component.css'
})
export class GuiaCardComponent {
  @Input() product!: Product;
}
