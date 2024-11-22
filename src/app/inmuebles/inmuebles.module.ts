import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuCuartosComponent } from './menu-cuartos/menu-cuartos.component';
import { MenuEdificiosComponent } from './menu-edificios/menu-edificios.component';
import {NavbarComponent} from '../shared/navbar/navbar.component';
import {CardAlojamientoComponent} from '../shared/card-alojamiento/card-alojamiento.component';

@NgModule({
  declarations: [
    MenuCuartosComponent,
    MenuEdificiosComponent,
    NavbarComponent,
    CardAlojamientoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class InmueblesModule { }
