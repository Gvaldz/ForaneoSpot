import { Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: "Especificaciones",
      input: "text",
      inputPlaceholder:`Especificaciones para ${this.comida.nombre}`,
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "ACEPTAR",
      confirmButtonColor:"blue",
      cancelButtonText:"CANCELAR",
      cancelButtonColor:'red',
      showLoaderOnConfirm: true,

      });
  }
}
