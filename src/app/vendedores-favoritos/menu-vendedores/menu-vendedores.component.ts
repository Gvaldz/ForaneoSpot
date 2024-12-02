import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {VendedorService} from '../../vendedor.service';
import {NgFor} from '@angular/common';

@Component({
  selector: 'app-menu-vendedores',
  templateUrl: './menu-vendedores.component.html',
  styleUrl: './menu-vendedores.component.css'
})
export class MenuVendedoresComponent {
  vendedores: any[]=[];
  searchText: string = '';

  constructor(private router: Router, private vendedorService: VendedorService) {
  }

  ngOnInit() {
    this.vendedorService.obtenerVendedores().subscribe(
      (data) => {
        this.vendedores = data;
        console.log(data)
      },
      (error) => {
        console.error('Error al obtener:', error);
      }
    )
  }

  get filteredVendedores(){
    if (!this.searchText.trim()) {
      return this.vendedores;
    }
    return this.vendedores.filter(data =>
      data.nombre.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
