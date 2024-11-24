import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComidaComponent } from '../menus/card-comida/card-comida.component';
import { OrdenesComidaComponent } from './ordenes-comida/ordenes-comida.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CardAlojamientoComponent } from './card-alojamiento/card-alojamiento.component';



@NgModule({
    declarations: [
        CardComidaComponent,
        OrdenesComidaComponent,
        NavbarComponent,
        CardAlojamientoComponent
    ],
  exports: [
    CardComidaComponent,
    NavbarComponent,
    CardAlojamientoComponent
  ],
    imports: [
        CommonModule
    ]
})
export class SharedModule { }
