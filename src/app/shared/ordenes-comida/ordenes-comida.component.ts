import { Component, EventEmitter, Output, Input} from '@angular/core';

@Component({
  selector: 'app-ordenes-comida',
  templateUrl: './ordenes-comida.component.html',
  styleUrl: './ordenes-comida.component.css'
})
export class OrdenesComidaComponent {

  @Input() isOpen = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onOrder = new EventEmitter<void>();

}
