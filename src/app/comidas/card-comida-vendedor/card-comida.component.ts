import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuIU } from '../../menus/menu-iu';
import { MenusService } from '../../menus/menu.service';

@Component({
  selector: 'app-card-comida',
  templateUrl: './card-comida.component.html',
  styleUrl: './card-comida.component.css'
})
export class CardComidaVendedor implements OnInit {

  menus: MenuIU[] = [];

  constructor(private router: Router, private menusService: MenusService) {}

  ngOnInit(): void {
    this.menusService.menus$.subscribe((menus) => {
      this.menus = menus;
    });
  }

  isModalOpen = false;

  ordenarComida(id: number) {
    alert(`Comida con ID ${id} ordenada.`);
  }

  onEdit(menu: MenuIU) {
    console.log('Editar menú:', menu);
    this.router.navigate(['/formulario-comida', menu.id]); 
  }

  onDelete(id: number) {
    if (confirm('¿Estás seguro de eliminar este menú?')) {
      this.menusService.deleteMenu(id);
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  handleOrder() {
    console.log('Order placed');
    this.closeModal();
  }

  navegarMenuComida() {
    this.router.navigate(['/menuComida']);
  }
}
