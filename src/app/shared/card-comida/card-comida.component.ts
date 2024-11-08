import { Component } from '@angular/core';

@Component({
  selector: 'app-card-comida',
  templateUrl: './card-comida.component.html',
  styleUrl: './card-comida.component.css'
})
export class CardComidaComponent{
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  handleOrder() {
    // Handle order logic here
    console.log('Order placed');
    this.closeModal();
  }
}
