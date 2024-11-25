import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {CardAlojamientoComponent} from './card-alojamiento/card-alojamiento.component';

@NgModule({
    declarations: [
    NavbarComponent,
      CardAlojamientoComponent
    ],
  exports: [
    NavbarComponent,
    CardAlojamientoComponent
  ],
    imports: [
        CommonModule
    ]
})
export class SharedModule { }
