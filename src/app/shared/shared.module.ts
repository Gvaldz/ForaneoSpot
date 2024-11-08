import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComidaComponent } from './card-comida/card-comida.component';
import { OrdenesComidaComponent } from './ordenes-comida/ordenes-comida.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
    declarations: [
        CardComidaComponent,
        OrdenesComidaComponent,
        NavbarComponent
    ],
  exports: [
    CardComidaComponent,
    NavbarComponent
  ],
    imports: [
        CommonModule
    ]
})
export class SharedModule { }
